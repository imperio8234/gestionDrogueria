/* eslint-disable react/prop-types */
import { Separador } from "../../../toolsDev/separacion"

export const VentasDia = ({getVentas, productos, data}) => {
    return (
        <div className="card-body scrollstyle">
                <div className="accordion accordion-flush" id="accordionFlushExample">
                   {
                    data.map((venta, index)=> {
                        return (
                            <div key={index} className="accordion-item">
                                <h2 className="accordion-header">
                                    <button onClick={() => getVentas(venta.id_venta)} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${index}`} aria-expanded="false" aria-controls={`collapse-${index}`}>
                                          {venta.fecha}
                                    </button>
                                </h2>
                               <div id={`collapse-${index}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                  {
                                    productos.map((producto, index )=> {
                                        return (
                                            <div key={index} className="accordion-body d-flex justify-content-around">
                                                 <div>{producto.producto}</div>
                                                 <div>{producto.cantidad}</div>
                                                 <div>{producto.laboratorio}</div>
                                                 <div>{producto.valor_total?Separador(producto.valor_total): 0}</div>
                                             </div>
                                        )
                                    })
                                  }
                               </div>
                            </div>
                        )
                    })
                   }

  
                </div>

            </div>
    )
}