import { useState } from "react"
import { MedioPago } from "./componentsfacturar/medioDePago";
import { Pagar } from "./componentsfacturar/pago";

export const Pago = ({setFacturar}) => {
    const [efectivo, setEfectivo] = useState(false);
    const [closeFactu, setCloseFactu] = useState();
    const close= (cerrar) => {
        setFacturar(cerrar)
    }
    
    return (
        <div className="cont-pago">
            {efectivo?<Pagar close={close} setEfectivo={setEfectivo} />:<MedioPago close={close} setEfectivo={setEfectivo} /> }            
        </div>
    )
}