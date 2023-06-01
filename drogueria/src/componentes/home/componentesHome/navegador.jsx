import {Link} from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const Navegador=()=>{
    return(
        <>
            <Link className="metrica span" to={"/"}>metrica</Link>
            <Link className="inventario span" to={"/inventario"}>inventario</Link>
            <Link className="creditos span" to={"/creditos"}>creditos</Link>
            <Link className="deudas span">deudas</Link>
        </>
    );
};