import axios from "axios";
import { useState } from "react";
import {enqueueSnackbar} from "notistack";

// eslint-disable-next-line react/prop-types
export const ModalRegister=({seeModal, setSeeModal, getApi})=>{
    const [nombre, setNombre]=useState("");
    const [phoneNumber, setphoneNumber]=useState("");
    const [date, setdate]=useState("");
    const [value, setvalue]=useState("");
    

    //optener informacion cancelar el furmulario y guardarlo

    const upDateAndDelete=(e)=>{
        const producto={
            id_usuario:1,
            nombre:nombre,
            phoneNumber:phoneNumber,
            date:date,
            value:value,
            
        }
        e.preventDefault();
        if(e.target.name == "cancelar"){
            setSeeModal(false);
            //formatear formulario
            setNombre("");
            setdate("");
            setvalue("");
            setphoneNumber("");
        }else{
            console.log("guardar")
            enviarApi(producto)
        }

       async function enviarApi(producto){
            try {
                await axios.post("http://localhost:2000/addcustomers",producto)
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
    function dateCurrent() {

      let fechaYhora= new Date();
      
      return `${fechaYhora.toLocaleDateString()} hora:${fechaYhora.getHours()}:${fechaYhora.getMinutes()}`
        
    }
    return(
        <>

            <div onClick={(e)=>{e.target.className == "modalRegister"&&setSeeModal(false)}} className={seeModal?"modalRegister":"modalRegister closedModal"}>
                    <div className="formularioProducts">
                            REGISTRAR CLIENTE
                        <form className="formuR form-control form-control-sm">
                        
                            <label  htmlFor="producto">
                                nombre 
                                <input onChange={(e)=>setNombre(e.target.value)} className="form-control form-control-sm" name="producto" id="producto" type="text" value={nombre} />
                            </label>
                            <label  htmlFor="un">
                                celular
                                <input onChange={(e)=>setphoneNumber(e.target.value)} className="form-control form-control-sm" name="un" id="un" type="number" value={phoneNumber}/>
                            </label>
                            <label htmlFor="date">
                                fecha
                                <input disabled placeholder={dateCurrent()} onChange={()=>setdate(dateCurrent())} className="form-control form-control-sm" name="date" id="date" type="text" value={date}/>
                            </label>
                            <label htmlFor="value">
                            valor
                                <input onChange={(e)=>setvalue(e.target.value)} className="form-control form-control-sm" name="value" id="value" type="text" value={value} />
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