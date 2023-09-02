
// eslint-disable-next-line react/prop-types
export const VentasGastos = ({setHistorial}) => {
    const showHistorial =() => {
        setHistorial(true)
    }

    return (
        <div className="card h-100 d-flex flex-column justify-content-around con-ventas-historial">
            <span onClick={() => showHistorial(true)} className="btn bg-info pointer">Historial de ventas</span>
            <span  className="btn">Historial de gastos</span>
        </div>
        
    )
}