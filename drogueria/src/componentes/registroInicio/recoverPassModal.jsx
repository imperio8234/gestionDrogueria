// eslint-disable-next-line react/prop-types
export const ModalRecover=({recover})=>{
    return(
        <div className="position-absolute w-75 mh-25 bg-light shadow-lg rounded p-3 mreco">
            <div className="contenedorInput mb-3">
                <legend className="fs-6">recupera tu contraseña</legend>
                <input placeholder="ingresa tu email" className="form-control" type="email" name="correo" id="correo" />
            </div>
            <div className="d-flex gap-3 justify-content-around">
                <button onClick={()=>recover(false)} className="btn btn-danger">cancelar</button>
                <button className="btn btn-success">recuperar</button>
            </div>
        </div>
    );
};