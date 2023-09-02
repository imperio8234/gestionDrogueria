
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { useState } from "react"
import { Grafico } from "./grafico/grafico";

export const GraficosMes = () => {
    const [date, setDate] =useState([]);

    useEffect(() => {
      getMonthApi();
    }, [])

    const getMonthApi = async () => {
        try {
            const res = await fetch("http://localhost:2000/api/v1/ventas/graficos", {
                method: "GET",
                credentials: "include",
                headers: {
                    "content-type":"application/json"
                }
                
            })
            const resultado = await res.json();
            if (resultado.success) {
                setDate(resultado.data)
            }
        } catch (error) {
            enqueueSnackbar("error", {variant: "error"})
        }
    }
    return (
        <div className="card-body scrollstyle d-flex flex-wrap object-fit-scale gap-2">
            
                {
                   date? date.map((data, index) => {
                        return (
                            <div key={index} className="w-100 h-auto border ">
                                <div className="card">
                                <div className="card-header">
                                <p>{data.mes}</p>
                                </div>
                                 <div>
                                    <Grafico valores1={data.dias} />
                                </div>
                            </div>
 
                           </div>
                        )
                    })
                    :<p>no existen registros</p>

                }
                
               
            
              
        </div>
    )
}