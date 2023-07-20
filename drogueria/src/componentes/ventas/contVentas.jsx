import { enqueueSnackbar, SnackbarProvider } from "notistack"
import { useEffect } from "react"
import { useState } from "react"
import "../../css/home/ventas.css"
import { Barra } from "./components/barraTotal"
import { ProductosVenta } from "./components/busquedaProducto"
import { ListaVentas } from "./components/listaVenta"
import { Panel } from "./components/panel"
import {userContext} from "./context/context"
export const Ventas = () => {
    const [products, setProducts] = useState([]);
    const [venta, setVenta] = useState();
    useEffect(() =>{
        getProducts()
    },[])
    useEffect(() => {
  suma();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products])
    const  suma = () => {
        let valores = [];
        for (const i in products) {
            valores.push(products[i].valor_total)
        }
        const valorVentas = valores.reduce((a,b) =>a + b, 0)
        setVenta(valorVentas)
    }
    const getProducts = async () => {
        try {
            const res = await fetch("http://localhost:2000/api/v1/lista/1", {
                method:"GET",
                headers:{
                    "content-type": "application/json"
                }
            })
            const result = await res.json();
            if (result.success) {
              //  setProducts(result.result)
            }
        } catch (error) {
            if (error) {
                enqueueSnackbar("se produjo un error", {variant:"error"})
                console.log(error)
            }
        }
    }
    const obj={
        products,
        venta
    }

    return (
      <SnackbarProvider>
         <userContext.Provider value={obj}>
         <div className="contentProductos d-flex flex-column">
            <ProductosVenta getProducts={getProducts} products={products} setProducts={setProducts} />
            <ListaVentas getProducts={getProducts} products={products} />
            <Barra venta={venta} />
            <Panel venta={venta} setProducts={setProducts} getProducts={getProducts} products={products} venta={venta} />
            
        </div>
       </userContext.Provider>
      </SnackbarProvider>
    )

}