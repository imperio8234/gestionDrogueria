import { useState, useEffect } from "react";
import "../../css/home/home.css";
import "../../css/home/components.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars} from "@fortawesome/free-solid-svg-icons";
import { Navegador } from "./componentesHome/navegador";
//import { ContentComponents } from "../inventario/contenedorProductos";
import { Link, Outlet } from "react-router-dom";


export const Home=()=>{
    const [openM, setOpenM]=useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
    


    return(
        <div className="w-100 h-100 bg-light contenthome">
            <div className={openM?"contentMenu":"contentMenu closeMenu"}>
                <div className="contentLog">
                   <img src="../../../public/logodro.png" alt="drogueria"/>
                </div>
                <div className="buttonsMenu">
                    {windowWidth <= 700 && <Navegador></Navegador>}
                    <Link className="cerrarSesion span">cerrar  sesion</Link>
                    <Link className="editarPerfil span">editar perfil</Link>
                    <Link className="contacto span">contacto</Link>

                </div>

            </div>

            <div className="contentNavigate">
                  <FontAwesomeIcon onClick={()=>openM == true?setOpenM(false):setOpenM(true)} className="desplMenu" icon={faBars} />
                <div className="navButtons" id="barMenu">
                   <Navegador></Navegador>
                </div>

                <div className="search">
                   <form action="">
                      <input className="form-control form-control-sm mb-5 mt-5" type="search"/>
                      <input  className="btn btn-primary ms-2 btn-sm mb-5 mt-5" type="button" value="buscar"/>
                   </form>

                </div>
            </div>

            {/*contenedoresde los componentes<ContentComponents width={windowWidth}/>*/}
          
           <Outlet />
        </div>
    )
}