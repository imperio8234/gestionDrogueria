import { Separador } from "../../../toolsDev/separacion";



// eslint-disable-next-line react/prop-types
export const Card =({nombre, info1, info2, tipo, costos, ganancia}) => {
    return(
        <div className="card w-100">
        <div className="card-header">
          <h3 className="mb-0">{nombre}</h3>
        </div>
        <div className="card-body">
          <h5 className="">{tipo}</h5>
          <ul className="list-group scrollstyle">
            
            {
                info1 ?
                // eslint-disable-next-line react/prop-types
                info1.map((cliene, index) => {
                    return (
                        <li key={index} className="list-group-item" >{cliene.nombre}</li>
                    )
                }) 
                :<li className="list-group-item">no hay registro</li>

            }
          </ul>
        </div>
        <div className="card">
          <div className="d-flex p-2 justify-content-around">
            <div className="col-sm-4">
              <p className="mb-1">total {nombre}:</p>
              <h4 className=" font-weight-bold">{info2?Separador(info2):0}</h4>
            </div>
            <div className={nombre == "creditos" || nombre == "deudas"? "col-sm-4 d-none":"col-sm-4" }>
              <p className="mb-1">Costo total:</p>
              <h4 className="font-weight-bold ">{costos?Separador(costos):0}</h4>
            </div>
            <div className={nombre == "creditos" || nombre == "deudas" ? "col-sm-4 d-none":"col-sm-4" }>
              <p className="mb-1">Ganancia:</p>
              <h4 className="font-weight-bold">{ganancia?Separador(ganancia): 0}</h4>
            </div>
          </div>
        </div>
      </div>
      


    )
}