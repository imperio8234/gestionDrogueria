import { enqueueSnackbar } from "notistack";
import { useState } from "react"
import { random } from "../../../toolsDev/random"
import { Pago } from "./pagoFactura";

// eslint-disable-next-line react/prop-types
export const Panel = ({getProducts, setProducts, venta}) => {
    const [facturar, setFacturar] = useState(false);
    const Vender = () => {
        
        setFacturar(true)

    }

    const cancelarVenta = async () => {
        try {
            const res = await fetch("http://localhost:2000/api/v1/lista/all/1",{
                method:"DELETE",
                headers:{
                    "content-type": "application/json"
                },
            })
            if (res) {
                enqueueSnackbar("venta cancelada", {variant: "success"});
                getProducts();
                setProducts([])
            } 
            
        } catch (error) {
            console.log(error, "error")
        }
    }
    return (
        <div className="cont-panel">
            <div className="cont-calcula">

            </div>
            <div className="actions-venta d-flex justify-content-center align-items-center gap-3 p-3 flex-column">
                <div onClick={() => Vender()} className="vender btn btn-success text-secondary-emphasis btn-sm w-100 h-50 fs-6 d-flex justify-content-between align-items-center">
                    <span>vender</span>
                    <span>{venta}</span>
                </div>
                <div className="devolucion btn btn-primary btn-sm w-100 h-50 fs-6 text-secondary-emphasis text-start">
                    <span>devoluciones</span>
                </div>
                <div onClick={()=> cancelarVenta()} className="btn btn-danger btn-sm text-secondary-emphasis text-start w-100 h-50 fs-6 ">
                    <span>cancelar venta</span>
                    
                </div>
                {facturar && <Pago  setFacturar={setFacturar}/>}

            </div>
        </div>
    )
}