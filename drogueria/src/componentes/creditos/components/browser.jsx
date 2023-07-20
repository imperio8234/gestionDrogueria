import { enqueueSnackbar } from "notistack";
import { useState, useEffect } from "react"

// eslint-disable-next-line react/prop-types
export const Search = ({ setData, getApi}) => {
    const [words, setWords] = useState([]);
     //// buscar producto           
     async function buscador(){
       try {
        const res = await fetch(`http://localhost:2000/api/v1/creditos/find/1/${words}`, {
            method:"GET",
            headers:{
                "content-type":"application/json"                
            }
        })
        const result = await res.json();
        if (result.success) {
             setData(result.data);
        } else {
            enqueueSnackbar("no se encontro ningun registro", {variant: "info"})
        }
       } catch (error) {
        if( error){
            enqueueSnackbar(error.message,{variant: "error"})
        }
        
       }
        }


        // actualizar pagina
    useEffect(() => {
        if (words.length < 1) {
            getApi()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [words])
          
    return (
        <>
        <form action="" className="">
            <input onChange={(e) => setWords(e.target.value)} className="form-control form-control-sm buscador" type="search" name="buscadorOptionsNav" id="buscadorOptionsNav" />
            <input onClick={buscador} className="btn btn-dark btn btn-sm" type="button" value="buscar" />
          </form>
        </>
    )
}