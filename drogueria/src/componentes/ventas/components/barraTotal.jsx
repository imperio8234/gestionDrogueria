// eslint-disable-next-line react/prop-types
export const Barra = ({venta}) => {
    return (
        <div className="cont-bar">
            <div className="cont-text">
             <span>valor : 123455</span>
            </div>
            <div className="cont-total">
                <span>total:{venta}</span>
            </div>
        </div>
    )
}