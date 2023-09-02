import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { enqueueSnackbar } from "notistack";
import { useState, useEffect } from "react"
import { Subscripcion } from "../../../pagarMensualidad/subscripcion";

// eslint-disable-next-line react/prop-types
export const Search = ({ setData}) => {
    const [words, setWords] = useState([]);
    const [subscripcion, setSubscripcion] = useState(false);
     //// buscar producto           
     async function buscador(e){
        e.preventDefault()
       try {
        const res = await fetch(`http://localhost:2000/api/v1/ventas/buscar/${words}`, {
            method:"GET",
            headers:{
                "content-type":"application/json"                
            },
            credentials: "include",
        })
        const result = await res.json();
    
        if (result.success) {
             setData(result.data);
        } else {
            
            if (result.status == 500) {
                setSubscripcion(true)
            }
        }
       } catch (error) {
        if( error){
            enqueueSnackbar(error.message,{variant: "error"})
        }
        
       }
        }


        // actualizar pagina
    useEffect(() => {
        if (words.length <= 0) {
         setWords("");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [words])
          
    return (
        <>
        <form onSubmit={(e)=> e.preventDefault() } action="" className="d-flex gap-3">
            <div className="search-input">
            <input placeholder="busca el producto a vender" onChange={(e) => {buscador(e), setWords(e.target.value)}} className="bg-white text-black form-control-sm buscador rounded-5 border-white" type="search" name="buscadorOptionsNav" id="buscadorOptionsNav" />
            <div onClick={(e) => buscador(e)} className="link-primary"><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
            </div>
          </form>
          
          {subscripcion && <Subscripcion setSubscripcion={setSubscripcion} />}
        </>
    )
}