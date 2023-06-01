import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


// eslint-disable-next-line react/prop-types
export const Historial=({showRecord, setShowRecord, sendNameRecord})=>{
        return(
        <div className={showRecord?"contentHistory d-flex flex-column":"closeRecord"}>
            <div className="w-100">
            <FontAwesomeIcon onClick={()=>showRecord?setShowRecord(false):setShowRecord(true)} className="fs-5 position-absolute top-0 start-0 m-2" icon={faXmark} />
            <span className="">{sendNameRecord} </span>
            </div>
            
            <div className="d-flex w-100 gap-4 contTable " >
           <div className="tabla-1 scrollstyle pe-2 w-100">
            <span>abonos</span>
           <table className="table-1 table">
                <thead>
                                        <tr>
                        <th scope="col">fecha </th>
                        <th scope="col">producto</th>
                        <th scope="col">valor</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>2/2/2023</td>
                        <td>champoo</td>
                        <td>20.000</td>
                        <td>editar</td>
                        <td className="botoneshis">eliminar</td>
                    </tr>
                    <tr>
                        <td>2/2/2023</td>
                        <td>champoo</td>
                        <td>20.000</td>
                        <td className="botoneshisEdit">editar</td>
                        <td className="botoneshis">eliminar</td>
                    </tr>
                    <tr>
                        <td>2/2/2023</td>
                        <td>champoo</td>
                        <td>20.000</td>
                        <td>editar</td>
                        <td className="botoneshis">eliminar</td>
                    </tr>
                </tbody>
            </table>
           </div>

           {/* tabla 2 */}
           <div className="tabla-2 w-100 scrollstyle pe-2">
           <span>abonos</span>
           <table className="table" >
                <thead className="table-2">
                                    <tr>
                        <th>fecha</th>
                        <th>producto</th>
                        <th>valor</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>2/1/2023</td>
                        <td>champoo</td>
                        <td>2000</td>
                        <td>editar</td>
                        <td>eliminar</td>
                    </tr>
                    <tr>
                        <td>2/1/2023</td>
                        <td>champoo</td>
                        <td>2000</td>
                        <td>editar</td>
                        <td>eliminar</td>
                    </tr>
                    <tr>
                        <td>2/1/2023</td>
                        <td>champoo</td>
                        <td>2000</td>
                        <td>editar</td>
                        <td>eliminar</td>
                    </tr>
                    <tr>
                        <td>2/1/2023</td>
                        <td>champoo</td>
                        <td>2000</td>
                        <td>editar</td>
                        <td>eliminar</td>
                    </tr>
                    <tr>
                        <td>2/1/2023</td>
                        <td>champoo</td>
                        <td>2000</td>
                        <td>editar</td>
                        <td>eliminar</td>
                    </tr>
                    <tr>
                        <td>2/1/2023</td>
                        <td>champoo</td>
                        <td>2000</td>
                        <td>editar</td>
                        <td>eliminar</td>
                    </tr>
                    <tr>
                        <td>2/1/2023</td>
                        <td>champoo</td>
                        <td>2000</td>
                        <td>editar</td>
                        <td>eliminar</td>
                    </tr>
                    <tr>
                        <td>2/1/2023</td>
                        <td>champoo</td>
                        <td>2000</td>
                        <td>editar</td>
                        <td>eliminar</td>
                    </tr>
                    <tr>
                        <td>2/1/2023</td>
                        <td>champoo</td>
                        <td>2000</td>
                        <td>editar</td>
                        <td>eliminar</td>
                    </tr>
                </tbody>
            </table>
  
           </div>
                     </div>
        </div>
    );
};