import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronUp} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
export const ClientTools=({deleteOredit, faTrash, faUserPen, faMinus,faPlus, windowWidth})=>{
    // verificacion del tamaño de la pantalla
    const [pantalla, setPantalla]=useState();
      useEffect(()=>{
        const display=windowWidth <= 700;
        setPantalla(display)

      },[pantalla, windowWidth])
    


    return(
        <>
             <td onClick={(e)=>deleteOredit(e)} className="historial">HISTORIAL<FontAwesomeIcon className="iconHisto" icon={faChevronUp} /></td>
             <td onClick={(e)=>deleteOredit(e)} className="abonar btnDiseño"><FontAwesomeIcon className="btnDiseñoI me-2" icon={faMinus} /></td>
             <td onClick={(e)=>deleteOredit(e)} className="sumar btnDiseño"><FontAwesomeIcon className="btnDiseñoI me-2" icon={faPlus} /></td>
             <td onClick={(e)=>deleteOredit(e)} className="delet btnDiseño ms-2"><FontAwesomeIcon icon={faTrash} /></td>
             <td onClick={(e)=>deleteOredit(e)} className="edit btnDiseño ms-3"><FontAwesomeIcon icon={faUserPen} /></td>
                                    
        
        </>

    );
};