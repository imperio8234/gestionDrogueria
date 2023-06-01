// eslint-disable-next-line react/prop-types
export const Register=({setUser})=>{
    return (
        <>
        
        <form className="p-2 w-75">
            <fieldset className="">
                <legend>registrarse</legend>
              
                <input required placeholder="escribe un usuario" className="form-control fw-lighter" type="text" name="usuario" id="usuario" />
                <input required placeholder="correo electronico" className="form-control mt-3 fw-lighter" type="text" name="usuario" id="usuario" />
                <input required placeholder="numero de celular" className="form-control mt-3 fw-lighter" type="text" name="usuario" id="usuario" />
                <input required placeholder="crea una contraseña" className="form-control mt-3 fw-lighter" type="password" name="pass" id="pass" />
                <fieldset>
                <button className="btn btn-primary mt-3">registrarme</button>
                </fieldset>
            </fieldset>
        </form>
        <a href="#" onClick={()=>setUser(true)}>iniciar sesion</a>
        
        </>
    );
}