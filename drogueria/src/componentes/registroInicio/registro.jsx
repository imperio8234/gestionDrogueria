import { enqueueSnackbar } from "notistack";
import { useState } from "react";
// eslint-disable-next-line react/prop-types
export const Register=({setUser})=>{
    const [caracteres, setCaracteres] = useState(0);
    const registrarme = (e) => {
        e.preventDefault();
        const data = JSON.stringify(Object.fromEntries( new FormData(e.target)));
        
        sendApi(data)
    }
    const sendApi = async (registro) => {
        try {
            const res = await fetch("http://localhost:2000/api/v1/user", {
                method:"POST",
                headers:{
                    "content-type":"application/json" 
                },
                credentials: "include",
                body:registro
            })
            const resultado = await res.json();
            if (resultado.success) {
                enqueueSnackbar(resultado.message, {variant: "success"});
                setUser(true)
            } else {
                enqueueSnackbar(resultado.message, {variant: "warning"})        
            }
           
        } catch (error) {
            //console.log(error)
            
        }
    }

    return (
        <>
        
        <form className="p-2 w-75" onSubmit={(e) => registrarme(e)}>
            <fieldset className="">
                <legend>registrarse</legend>
              
                <input required placeholder="escribe un usuario" className="form-control fw-lighter" type="text" name="nombre" id="usuario" />
                <input required placeholder="correo electronico" className="form-control mt-3 fw-lighter" type="text" name="correo" id="usuario" />
                <input required placeholder="numero de celular" className="form-control mt-3 fw-lighter" type="text" name="celular" id="usuario" />
                <input onChange={(e)=> setCaracteres( e.target.value.length)} required placeholder="crea una contraseña" className="form-control mt-3 fw-lighter" type="password" name="contraseña" id="pass" />
                {caracteres < 9 && <p className="fs-6 text-danger">Debe tener almenos 9 caracteres</p>}
                <fieldset>
                <button className="btn btn-primary mt-3">registrarme</button>
                </fieldset>
            </fieldset>
        </form>
        <a href="#" onClick={()=>setUser(true)}>iniciar sesion</a>
        
        </>
    );
}