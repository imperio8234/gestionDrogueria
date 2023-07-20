import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
export const ClientTools=({handlerClick, faTrash, faUserPen, faMinus,faPlus, windowWidth})=>{
    // verificacion del tamaño de la pantalla
    const [pantalla, setPantalla]=useState();
      useEffect(()=>{
        const display=windowWidth <= 700;
        setPantalla(display)

      },[pantalla, windowWidth])
    


    return(
        <>
             <td onClick={()=>handlerClick("Historial")} className="historial">Historial</td>
             <td ><FontAwesomeIcon onClick={()=>handlerClick("abonar")} className="abonar" icon={faMinus} /></td>
             <td ><FontAwesomeIcon onClick={()=>handlerClick("sumar")}  className="sumar" icon={faPlus} /></td>
             <td ><FontAwesomeIcon onClick={()=>handlerClick("delet")} className="delet" icon={faTrash} /></td>
             <td ><FontAwesomeIcon onClick={()=>handlerClick("edit")} className="edit" icon={faUserPen} /></td>
                                    
        </>

    );
};