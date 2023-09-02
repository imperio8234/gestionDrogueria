
import './App.css'
import { Main } from './componentes/registroInicio/principal'
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import { useState } from 'react';
import { Home } from './componentes/home/home';
import {SnackbarProvider } from "notistack";
import { useEffect } from 'react';




function App() {
  const isLogin = localStorage.getItem("user");
  
  const [login, setLogin]=useState(false);

  useEffect(()=>{
    if (isLogin ) {
      setLogin(true);
          
    }else{
      setLogin(false)
    }
  }, [isLogin]);
// funcion usuario logueado o no logueado 
  return (
  <SnackbarProvider>
    
    <div className='app'>
    {!login?<Main setLogin={setLogin}></Main>:<Home setLogin = {setLogin} />}    
  </div>
  </SnackbarProvider>
  );
}

export default App
