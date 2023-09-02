import { useState } from "react";
import { enqueueSnackbar } from "notistack";

// eslint-disable-next-line react/prop-types
export const ModalRecover=({recover})=>{
    const [correo, setcorreo] = useState();
    const [celular, setCelular] = useState();
    const recuperar = async () => {
        try {
            const res = await fetch("http://localhost:2000/api/v1/user/password", {
                method: "PUT",
                headers: {
                  "content-type":"application/json" 
                },
                body:JSON.stringify({
                    correo,
                    celular
                })

            })
            const resutado = await res.json();
            console.log(resutado)
            if(resutado.success){
                enqueueSnackbar(resutado.message, {variant: "success"});
                recover(false);
                setCelular("");
                setcorreo("");
            } else {
                enqueueSnackbar(resutado.message, {variant: "error"});
            }          
        } catch (error) {
            console.log(error)
            
        }
    }
    return(
        <div className="position-absolute w-50 mh-25 bg-light shadow-lg rounded p-3 mreco">
            <div className="contenedorInput mb-3">
                <legend className="fs-6">recupera tu contraseña</legend>
                <input value={correo} onChange={(e) => setcorreo(e.target.value)} placeholder="ingresa tu correo" className="form-control mb-3" type="correo" name="correo" id="correo" />
                <input value={celular} onChange={(e) => setCelular(e.target.value)} placeholder="ingresa tu celular" className="form-control" type="text" name="celular" id="correo" />
            </div>
            <div className="d-flex gap-3 justify-content-around">
                <button onClick={()=>{recover(false), setCelular(""), setcorreo("")}} className="btn btn-danger">cancelar</button>
                <button onClick={() => recuperar()} className="btn btn-success">recuperar</button>
            </div>
        </div>
    );
};