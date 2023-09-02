import { useState } from "react"
import { useEffect } from "react"
import { Subscripcion } from "../pagarMensualidad/subscripcion"
import { Card } from "./components/card"
import { CardResumen } from "./components/cardResumen"
import { VentasGastos } from "./components/cardVentasGastos"
import { HistorialVenta } from "./components/historialVentas"
import "../../css/home/metrica.css"

export const Metrica = () => {
    const [clienteCredito, setClienteCredito]= useState([]);
    const [totalCredito, setTotalCredito]= useState();
    const [deudas, setDeudas]= useState();
    const [totalDeudas, setTotalDeudas]= useState();
    const [historial, setHistorial]= useState(false);
    const [productos, setProductos]= useState([]);
    const [subscripcion, setSubscripcion] = useState(false);

    useEffect(()=>{
        getCretitos();
        getDeudas();
        getProductos();
    },[])

    const getCretitos = async () => {
        try {
            const res = await fetch("http://localhost:2000/api/v1/metrica/creditos ", {
                headers:{
                    "content-type": "application/json"
                },
                credentials:"include"
            });
           
            const result = await res.json();
            
            if (result.status == 500) {
                setSubscripcion(true)
            }
            if (result.success) {
                setClienteCredito(result.mayoresCreditos);
                setTotalCredito(result.totalCreditos);
            } 
        } catch (error) {
            console.log(error)
        }
    }

    const getDeudas = async () => {
        try {
            const res = await fetch("http://localhost:2000/api/v1/metrica/deudas", {
                headers:{
                    "content-type": "application/json"
                },
                credentials:"include"
            });
           
            const result = await res.json();
            
            if (result.status == 500) {
                setSubscripcion(true)
            }
            if (result.success) {
                setDeudas(result.mayoresDeudas);
                setTotalDeudas(result.totalDeudas);
            } 
        } catch (error) {
            console.log(error)
        }
    }

    const getProductos = async () => {
        try {
            const res = await fetch("http://localhost:2000/api/v1/metrica/productos", {
                headers:{
                    "content-type": "application/json"
                },
                credentials:"include"
            });
           
            const result = await res.json();
            
            if (result.status == 500) {
                setSubscripcion(true)
            }
            if (result.success) {
                result.data && setProductos(result.data);
            } 
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="contentProductos bg-body-secondary d-flex flex-column justify-content-around ">
            <div className="w-100 h-50  d-flex gap-2 p-2 cont-cards scrollstyle">
            <Card tipo={"lista de creditos"} nombre={"creditos"} info1={clienteCredito} info2={totalCredito}>
            </Card>
             <Card tipo={"sin existencias"}
                nombre={"inventario"}
                info1={productos && productos.length > 0 ? productos[0]?.productlow : []}
                info2={productos && productos.length > 0 ? productos[0]?.precios : ""}
                costos={productos && productos.length > 0 ? productos[0]?.costos : ""}
                ganancia={productos && productos.length > 0 ? productos[0]?.ganancia : ""}
                />
            <Card tipo={"lista de deudas"}  info1={deudas} info2={totalDeudas} nombre ={"deudas"}/>
            </div>
           <div className="w-100 h-50  p-2 d-flex cont-cards">
            <VentasGastos setHistorial={setHistorial} />
           <CardResumen getCretitos={getCretitos}/>
           </div>
           {historial && <HistorialVenta setHistorial={setHistorial} />}
           {subscripcion && <Subscripcion setSubscripcion={setSubscripcion} />}
        </div>
    )
}