import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { ContentComponents } from './componentes/inventario/contenedorProductos.jsx';
import { ContentCredits } from './componentes/creditos/contentCredits.jsx';
import { ContentDeudas } from './componentes/deudas/contentDeudas.jsx';
import { Ventas } from './componentes/ventas/contVentas.jsx';
import { Metrica } from './componentes/metricas/contMetrica.jsx';
import UserProfile from './componentes/perfil/contentProfile.jsx';
//import store from './componentes/redux/store.js';
//import { Provider } from "react-redux";
// crear enrutador
const router=createBrowserRouter([
  {
    path:"/",
    element:<App />,
    children:[
    {
      path:"/",
      element:<Metrica />
    },
    {
      path: "/perfil",
      element: <UserProfile />

    },
    {
        path:"/inventario",
        element:<ContentComponents />
    },
    {
      path:"/creditos",
      element:<ContentCredits />
    }
    ,
    {
      path:"/deudas",
      element:<ContentDeudas />
    },
  {
    path:"/ventas",
    element:<Ventas />
  }        ]
  },
 
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/*<Provider store={store}>*/}
    <RouterProvider router={router} />
    {/*</Provider>*/}
  </React.StrictMode>,
)
