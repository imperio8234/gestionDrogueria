import { enqueueSnackbar } from "notistack";
import { useState } from "react";
// eslint-disable-next-line react/prop-types
export const Inicio=({ setUser, recover, isLogin})=>{
  const [caracteres, setCaracteres] = useState(0);
  
  const login = (e) => {
    e.preventDefault()
    const data = JSON.stringify(Object.fromEntries(new FormData(e.target)));
    sendApi(data);

  }

  const sendApi = async (usuario)=> {
    try {
      const res = await fetch("http://localhost:2000/api/v1/user/aut", {
        method: "POST",
        headers: {
          "content-type":"application/json" 
        },
        credentials: "include",
        body:usuario

      });
      const resultado = await res.json();
      
      if (resultado.success) {
        isLogin(resultado.diasActivo)
        enqueueSnackbar(resultado.message, {variant: "success"})

      } else {
        enqueueSnackbar(resultado.message, {variant: "warning"});        
      }
    } catch (error) {
      enqueueSnackbar("hay un error", {variant: "error"});
      
    }
  }
    return(
      <>
 
        <form onSubmit={(e) => login(e)} className="p-2 w-75">
            <fieldset className="grid row-gap-3">
                <legend>inicia sesion</legend>
                <label htmlFor="usuario">correo</label>
                <input className="form-control" type="text" name="correo" id="usuario" />
                <label className="" htmlFor="pass">contraseña</label>
                <input onChange={(e)=> setCaracteres( e.target.value.length)} className="form-control" type="password" name="contraseña" id="pass" />
                {caracteres < 9 && <p className="fs-6 text-danger">Debe tener almenos 9 caracteres</p>}               
                <button className="btn btn-primary mt-3">ingresar</button>
            </fieldset>
        </form>
        <a href="#" onClick={()=>recover(true)}>olvidate tu contraseña</a>
        <a href="#" onClick={()=>setUser(false)}>registrarse</a>
      </>
    )
}