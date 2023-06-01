
import './App.css'
import { Main } from './componentes/registroInicio/principal'
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import { useState } from 'react';
import { Home } from './componentes/home/home';



function App() {
  const [login, setLogin]=useState(false);
// funcion usuario logeado o no logueado 
  return (
  <div className='app'>
    {login?<Main></Main>:<Home />}    
  </div>
  );
}

export default App
