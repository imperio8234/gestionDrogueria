import { useState } from "react";
import "../../css/registroInicio/prin.css"
import { Inicio } from "./inicio";
import { ModalRecover } from "./recoverPassModal";
import { Register } from "./registro";

export const Main=()=>{

    const [user, setUser]=useState(true);
    const [passRecover, setPassRecover]=useState(false);
    return(
        <div className="mainRegisterInicio">
            <div className="containerForm d-flex justify-content-center align-items-center flex-column">
                {user?<Inicio setUser={setUser} recover={setPassRecover}></Inicio>:<Register setUser={setUser} />}
                {passRecover&&<ModalRecover recover={setPassRecover} />}
            </div>
            
            <div className="containerImg">
                
                <img src="../../../public/drogueria.JPEG" alt="drogueria"/>
            </div>

        </div>
    );
};