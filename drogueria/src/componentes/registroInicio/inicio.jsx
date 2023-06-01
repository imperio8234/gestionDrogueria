
// eslint-disable-next-line react/prop-types
export const Inicio=({ setUser, recover})=>{
    return(
      <>
 
        <form className="p-2 w-75">
            <fieldset className="grid row-gap-3">
                <legend>inicia sesion</legend>
                <label htmlFor="usuario">usuario</label>
                <input className="form-control" type="text" name="usuario" id="usuario" />
                <label className="" htmlFor="pass">contraseña</label>
                <input className="form-control" type="password" name="pass" id="pass" />
               
                <button className="btn btn-primary mt-3">ingresar</button>
            </fieldset>
        </form>
        <a href="#" onClick={()=>recover(true)}>olvidate tu contraseña</a>
        <a href="#" onClick={()=>setUser(false)}>registrarse</a>
      </>
    )
}