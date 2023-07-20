import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


// eslint-disable-next-line react/prop-types
export const ClientToolsDesk=({id, showBtn, faTrash, faUserPen})=>{
 
    return(
        <>
             <td onClick={()=>{showBtn(id, "Historial")}} className="historial ">historial</td>
             <td onClick={()=>{showBtn(id, "abonar")}} className="abonar btnDiseñoDesk">abonar</td>
             <td onClick={()=>{showBtn(id, "sumar")}} className="sumar btnDiseñoDesk">sumar</td>
             <td onClick={()=>{showBtn(id, "delet")}} className="delet btnDiseñoDesk ms-2 z-1"><FontAwesomeIcon className="" onClick={(e) => e.stopPropagation()} icon={faTrash} /></td>
             <td onClick={()=>{showBtn(id, "edit")}} className="edit btnDiseñoDesk"><FontAwesomeIcon className="" onClick={(e) => e.stopPropagation()} icon={faUserPen} /></td>
                                    
        
        </>

    );
};