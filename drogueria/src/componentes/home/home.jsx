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

  // cmbio de color de los botones
  const changeColorBtn = (elemento) => {
    const changeColorBtn = document.querySelectorAll(".btnChangeclic");
   changeColorBtn.forEach(e => {
    if(e.classList == elemento.target.classList) {
      e.classList.add("btnChange")
    } else {
      e.classList.remove("btnChange")
    }
   })
}
    


    return(
        <div className="w-100 h-100 bg-light contenthome">
            <div className={openM?"contentMenu":"contentMenu closeMenu"}>
                <div className="contentLog">
                   <img src="../../../public/logodro.png" alt="drogueria"/>
                </div>
                <div className="buttonsMenu">
                    {windowWidth <= 700 && <Navegador changeColorBtn={changeColorBtn}></Navegador>}
                    <Link onClick={(e) => changeColorBtn(e)} className="cerrarSesion span btnChangeclic">cerrar  sesion</Link>
                    <Link onClick={(e) => changeColorBtn(e)} className="editarPerfil span btnChangeclic">editar perfil</Link>
                    <Link onClick={(e) => changeColorBtn (e)} className="contacto span btnChangeclic">contacto</Link>

                </div>

            </div>

            <div className="contentNavigate">
                  <FontAwesomeIcon onClick={()=>openM == true?setOpenM(false):setOpenM(true)} className="desplMenu" icon={faBars} />
                <div className="navButtons" id="barMenu">
                   <Navegador changeColorBtn= {changeColorBtn}></Navegador>
                </div>
            </div>

            {/*contenedoresde los componentes<ContentComponents width={windowWidth}/>*/}
          
           <Outlet />
        </div>
    )
}