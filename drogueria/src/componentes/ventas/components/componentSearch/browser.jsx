import { enqueueSnackbar } from "notistack";
import { useState, useEffect } from "react"

// eslint-disable-next-line react/prop-types
export const Search = ({ setData}) => {
    const [words, setWords] = useState([]);
     //// buscar producto           
     async function buscador(e){
        e.preventDefault()
       try {
        const res = await fetch(`http://localhost:2000/api/v1/ventas/buscar/${words}/1`, {
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
         setWords("");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [words])
          
    return (
        <>
        <form onSubmit={(e)=> e.preventDefault() } action="" className="d-flex gap-3">
            <input placeholder="busca el producto a vender" onChange={(e) => setWords(e.target.value)} className="form-control form-control-sm buscador" type="search" name="buscadorOptionsNav" id="buscadorOptionsNav" />
            <input  onClick={(e) =>buscador(e)} className="btn btn-primary btn btn-sm" type="button" value="buscar" />
          </form>
        </>
    )
}