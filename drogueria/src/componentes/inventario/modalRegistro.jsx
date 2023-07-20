import axios from "axios";
import { useState } from "react";
import {enqueueSnackbar} from "notistack";

// eslint-disable-next-line react/prop-types
export const ModalRegister=({seeModal, setSeeModal, getApi})=>{
    const [nombre, setNombre]=useState("");
    const [unidades, setUnidades]=useState("");
    const [laboratorio, setLaboratorio]=useState("");
    const [costo, setCosto]=useState("");
    const [precio, setPrecio]=useState("");

    //optener informacion cancelar el furmulario y guardarlo

    const upDateAndDelete=(e)=>{
        const producto={
            idUsuario:1,
            nombre:nombre,
            unidades:unidades,
            laboratorio:laboratorio,
            costo:costo,
            precio:precio
        }
        e.preventDefault();
        if(e.target.name == "cancelar"){
            setSeeModal(false);
            //formatear formulario
            setNombre("");
            setLaboratorio("");
            setCosto("");
            setPrecio("");
            setUnidades("");
        }else{
            console.log("guardar")
            enviarApi(producto)
        }

       async function enviarApi(producto){
            try {
                await axios.post("http://localhost:2000/addproducts",producto)
                .then(res=>{
                    if(res.data.success){
                        getApi();
                        enqueueSnackbar("se guardo exitosamente",{variant:"success"})
                    }})
            } catch (error) {
            enqueueSnackbar(error, {variant:"error"})
                
            }
        }

    };
    return(
        <>

            <div onClick={(e)=>{e.target.className == "modalRegister"&&setSeeModal(false)}} className={seeModal?"modalRegister":"modalRegister closedModal"}>
                    <div className="formularioProducts">
                            REGISTRAR PRODUCTO
                        <form className="formuR form-control form-control-sm">
                        
                            <label  htmlFor="producto">
                                nombre del producto
                                <input onChange={(e)=>setNombre(e.target.value)} className="form-control form-control-sm" name="producto" id="producto" type="text" value={nombre} />
                            </label>
                            <label  htmlFor="un">
                                unidades
                                <input onChange={(e)=>setUnidades(e.target.value)} className="form-control form-control-sm" name="un" id="un" type="number" value={unidades}/>
                            </label>
                            <label htmlFor="laboratorio">
                                laboratorio
                                <input onChange={(e)=>setLaboratorio(e.target.value)} className="form-control form-control-sm" name="laboratorio" id="laboratorio" type="text" value={laboratorio}/>
                            </label>
                            <label htmlFor="costo">
                            costo
                                <input onChange={(e)=>setCosto(e.target.value)} className="form-control form-control-sm" name="costo" id="costo" type="text" value={costo} />
                            </label>
                            <label htmlFor="precio">
                                precio de venta
                                <input onChange={(e)=>setPrecio(e.target.value)} className="form-control form-control-sm" name="precio" id="precio" type="text"value={precio}/>
                            </label>

                            <div className="buttonsProucts  mt-5">
                                <button name="cancelar" onClick={(e)=>upDateAndDelete(e)} className="btn btn-danger btnCancel">cancelar</button>
                                <button name="upDate"onClick={(e)=>upDateAndDelete(e)}  className="btn btn-success btnUpdate">guardar</button>
                            </div>

                        </form>                   
                    </div>
            </div> 
        </>

    );
}; 