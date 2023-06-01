import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { ContentComponents } from './componentes/inventario/contenedorProductos.jsx';
import { ContentCredits } from './componentes/creditos/contentCredits.jsx';

// crear enrutador
const router=createBrowserRouter([
  {
    path:"/",
    element:<App />,
    children:[
    {
      path:"/",
      element:<h2>esta es la pagina de metricas</h2>
    },
    {
        path:"/inventario",
        element:<ContentComponents />
    },
    {
      path:"/creditos",
      element:<ContentCredits />
    }
             ]
  },
 
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
