import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


// eslint-disable-next-line react/prop-types
export const ClientToolsDesk=({deleteOredit, faTrash, faUserPen})=>{
    
    return(
        <>
             <td onClick={(e)=>deleteOredit(e)} className="historial ">historial</td>
             <td onClick={(e)=>deleteOredit(e)} className="abonar btnDiseñoDesk">abonar</td>
             <td onClick={(e)=>deleteOredit(e)} className="sumar btnDiseñoDesk">sumar</td>
             <td onClick={(e)=>deleteOredit(e)} className="delet btnDiseñoDesk ms-2"><FontAwesomeIcon icon={faTrash} /></td>
             <td onClick={(e)=>deleteOredit(e)} className="edit btnDiseñoDesk ms-3"><FontAwesomeIcon icon={faUserPen} /></td>
                                    
        
        </>

    );
};