
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { useState } from "react"
import { Separador } from "../../../toolsDev/separacion";
import { VentasDia } from "./historialVentasDia";
import { GraficosMes } from "./ventasGraficos";

// eslint-disable-next-line react/prop-types
export const  HistorialVenta = ({setHistorial})  => {

    const [data, setData] = useState([]);
    const [allData, setAllData] = useState([]);
    const [allDate, setAllDate] = useState([]);
    const [productos, setProductos] = useState([]);
    const [history, setHistory] = useState("");
    const [total, setTotal] =useState();
    const [diaMes, setDiaMes] =useState(true);
    
    const date = async (e) => {
        let fecha = "";
       if (e.includes("-")) {
        fecha = e.split("-").reverse();
    } else {
           fecha = e.split("/");
        
       }

       try {
        const res = await fetch(`http://localhost:2000/api/v1/ventas/history/${fecha}/1`, {
            method: "GET",
            credentials: "include",
            headers: {
                "content-type" : "application/json"
            }
        });
        const resultado = await res.json();
        if (resultado.success) {
            setData(resultado.data);
            setTotal(resultado.valorVentas)
        } else {
            enqueueSnackbar(resultado.message, {variant: "error"})
        }
       } catch (error) {
        enqueueSnackbar(error, {variant: "error"})
       }

    }

    const getVentas = async (e) => {
       try {
        const res = await fetch(`http://localhost:2000/api/v1/ventas/productosventas/${e}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "content-type" : "application/json"
            }
        })
        const resultado = await res.json();
        if (resultado.success) {
            setProductos(resultado.data)
        }
       } catch (error) {
        enqueueSnackbar(error, {variant: "error"})
       }
    }
    useEffect(() => {
    dateVentas();
    }, [])
    const dateVentas = async () => {
        const fecha = history.split("-")
        fecha.reverse();
        try {
         const res = await fetch(`http://localhost:2000/api/v1/ventas/history/all/1`, {
             method: "GET",
             credentials: "include",
             headers: {
                 "content-type" : "application/json"
             }
         });
         const resultado = await res.json();
         if (resultado.success) {
            const ordenar = (item) => {
              const partes = item.split("/");
              return new Date(partes[2], partes[1] -1 , partes[0])
            }
             setAllData(resultado.data.sort((a, b) => {
                const fechaA = ordenar(a);
                const fechaB = ordenar(b);
                return fechaA - fechaB;
             }))
         } else {
             enqueueSnackbar(resultado.message, {variant: "error"})
         }
        } catch (error) {
         enqueueSnackbar(error, {variant: "error"})
        }
 
     }
 
    return (
    <div className="cont-pago">
        <div className="w-100 h-100 card">
             <div className="ps-1 pe-2 bg-opacity-10 bg-dark cont-header-medio d-flex justify-content-between w-100 align-items-center">
                    <span>villa y tecneoweb te informa</span>
                    <span onClick={() =>setHistorial(false)} className="fs-1 pointer">&times;</span>
            </div>
            <div className="card-header d-flex gap-1 align-items-center">
                <p className="w-50 mt-2">lista ventas</p>
                <select onChange={(e) => date(e.target.value)} className="form-select " name="" id="">
                    {
                        allData?allData.map((date, index) => {
                            return (
                                <option key={index} value={date}>{date}</option>
                            )
                        }): <option  value={"no existen datos"}>no existen datos</option>

                    }
                </select>
                <input onChange={(e) => setHistory(e.target.value)} className="form-control" type="date" name="fecha" id="fecha" />
                <div onClick={() => date(history)} className="btn ">filtrar</div>
                <div className="d-flex border rounded-pill w-100">
                    <div onClick={() => setDiaMes(true)} className={`rounded-start-pill ${diaMes && "bg-success"} w-50 pointer`} >dia</div>
                    <div onClick={() => setDiaMes(false)} className={`rounded-end-pill ${!diaMes && "bg-success"} w-50 pointer`}>mes</div>

                </div>
            </div>
            {diaMes? <VentasDia getVentas={getVentas} productos={productos} data={data}/>: <GraficosMes allData={allData} />}
            <div className="card">
                <p>Total cierre del dia: {total?Separador(total): 0}</p>

            </div>

        </div>

    </div>
    )
}