import { enqueueSnackbar } from "notistack";
import { useState } from "react"
import { useEffect, useContext } from "react"
import {userContext} from "../context/context"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTrashCan, faPenToSquare} from "@fortawesome/free-regular-svg-icons"

// eslint-disable-next-line react/prop-types
export const ListaVentas = ({getProducts, products}) => {
   // const {products} = useContext(userContext);    
    const [productos, setProductos] = useState([]);
    const [edit, setEdit] = useState(0);
    useEffect(() => {
       setProductos(products) 
       console.log(products)
    }, [products])
    const deleteItem = async (idProducto, idUsuario) => {
        try {
            fetch(`http://localhost:2000/api/v1/lista/${idUsuario}/${idProducto}`, {
                method: "DELETE",
                headers:{
                    "content-type": "application/json"
                }
            })
            .then(result => {
                if (result) {
                    getProducts()
                }
            })
            
        } catch (error) {
            enqueueSnackbar("hay un error ", {variant: "warning"});
            console.log(error)
        }


    }
    const editItem = async (unidades, precio,id_producto, id_usuario, operacion ) => {
        console.log(id_producto, unidades)
      if (unidades <= 0) {
            deleteItem(id_producto, id_usuario);
        }
        let valorTotal = unidades * precio;
        
        const producto = {
            id_producto,
            id_usuario,
            unidades,
            valorTotal
        }

        try {
             await fetch("http://localhost:2000/api/v1/lista", {
                method: "PUT",
                headers:{
                    "content-type": "application/json"
                },
                body: JSON.stringify(producto)
            })
            getProducts()
            
        } catch (error) {
            if (error) {
                enqueueSnackbar("error", {variant:"warning"})
                console.log(error)
            }
        }
        
    }
    return (
        <div className="cont-list scrollstyle p-3">

            <div className="cont-table-list">
                <table className="table">
                    <tbody>
                        {
                           productos.length != 0? productos.map((item, index) => {
                             // Definir variables
                             let contador = !item.unidades? 1: item.unidades;

                             // Función para incrementar el contador
                             function incrementarContador(e) {
                               contador++;
                               contadorInit(e)
                             }
                             
                             // Función para reiniciar el contador
                             function reiniciarContador(e) {
                               contador --;
                               
                               contadorInit(e)
                             }
                             function contadorInit() {
                               document.querySelector(".counter").textContent = contador
                               document.querySelector(".total-item").textContent = contador * item.precio
                             }
                           
                                return (
                                    <tr className="fs-6" key={item.id_producto}>
                                      <td className="d-flex justify-content-center w-100">
                                        <div className="cont-unidades-suma w-100 d-flex gap-3">
                                          <div onClick={(e)=>{setEdit(item.id_producto); edit == item.id_producto && reiniciarContador(e); editItem(contador, item.precio, item.id_producto, item.id_usuario, "resta")} } className="restar-uni ">
                                             <span>&minus;</span>
                                          </div>
                                          <div className="contador ">
                                            <span className="counter">{item.unidades}</span>
                                          </div>
                                          <div onClick={(e) => {setEdit(item.id_producto); edit == item.id_producto && incrementarContador(e); editItem(contador, item.precio, item.id_producto, item.id_usuario, "suma")}} className="sumar-uni">
                                              <span>&#43;</span>
                                          </div>
                                        </div>
                                      </td>
                                      <td>{item.nombre}</td>
                                      <td>{item.precio}</td>
                                      <td className="total-item">{item.valor_total}</td>
                                      <td className=" w-25"><div className="w-100 d-flex justify-content-around">
                                           <div onClick={() => setEdit(item.id_producto)} className="im1 pointer">
                                            <FontAwesomeIcon icon={faPenToSquare} className="fs-4" />
                                           </div>
                                           <div onClick={() => deleteItem(item.id_producto, item.id_usuario)} className="im2 pointer">
                                           <FontAwesomeIcon icon={faTrashCan} className=" fs-4" />                                           </div>
                                          </div>
                                       </td>
                                    </tr> 
                                )
                            })
                        :<tr><td colSpan={5} className="text-center">no hay productos en la lista</td></tr>}                     
                    </tbody>
                </table>
            </div>

        </div>
    )
}