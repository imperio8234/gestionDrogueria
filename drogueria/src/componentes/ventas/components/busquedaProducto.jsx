import { useState } from "react"
import {Search} from "./componentSearch/browser.jsx"
import { readingCode } from "./componentSearch/readcode.js"
// eslint-disable-next-line react/prop-types
export const ProductosVenta = ({getProducts, setProducts, products}) => {
    const [Data, setData] = useState([]);
    
    const agregar = (item, unidades) => {
        
        const itemn = item
        itemn.unidades = unidades;
        itemn.valorTotal=valorTotal(itemn.precio, unidades)
        delete itemn.costo
        
       // postApiItem(itemn);
       setProducts([...products, itemn])

        
    }
    
    const valorTotal= (valor, uni) => {
        return parseInt(valor) * uni
    }
    const postApiItem = async (item) =>{
        try {
            const res = await fetch("http://localhost:2000/api/v1/lista", {
                method:"POST",
                headers:{
                    "content-type":"application/json" 
                },
                body:JSON.stringify(item)
            })
            const resultado = await res.json();
            if (resultado.success) {
                getProducts()
            }
        } catch (error) {
            if (error) {
                console.log(error)
            }
            
        }
    }
    return (
        <div className="cont-ventasAdd p-2 gap-2">
            <div className="buscadorVenta p-2">
                <Search setData={setData}/>
               {/* <div onClick={()=>readingCode()} className="btn btn-success"><span>leer codigo</span></div>
                <div className="cont-lector p-4 w-25 h-25">
                    <span className="btn btn-success">cerrar</span>
                <div id="video"></div>  
                </div>
                <p id="resultado"></p> */}    

            </div>
            <div className="ventaEncontrada p-2">
                <div className="contTable scrollstyle">
                    <table>
                        <tbody>
                            {
                                Data.map((item, index) => {
                                    return (
                                        <tr className="h-25" key={index}>
                                          <td>{item.nombre}</td>
                                          <td>{item.precio}</td>
                                          <td className="pointer add-list" onClick={()=>agregar(item, 1)}>agregar</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}