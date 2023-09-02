import { useState } from "react";
import "../../css/registroInicio/prin.css"
import { Inicio } from "./inicio";
import { ModalRecover } from "./recoverPassModal";
import { Register } from "./registro";
import { SnackbarProvider} from "notistack";


// eslint-disable-next-line react/prop-types
export const Main=({setLogin})=>{

    const [user, setUser]=useState(true);
    const [passRecover, setPassRecover]=useState(false);
    const isLogin = (prueba)=> {
        setLogin(true);
        localStorage.setItem("prueba", JSON.stringify(prueba))
        localStorage.setItem("user", true);

                
    }
    return(
        <SnackbarProvider>
            <div className="mainRegisterInicio">
            <div className="containerForm d-flex justify-content-center align-items-center flex-column">
                {user?<Inicio isLogin={isLogin} setUser={setUser} recover={setPassRecover}></Inicio>:<Register setUser={setUser} />}
                {passRecover&&<ModalRecover recover={setPassRecover} />}
            </div>
            
            <div className="containerImg">
                
                <img src="../../../public/drogueria.JPEG" alt="drogueria"/>
            </div>

        </div>
        </SnackbarProvider>
    );
};