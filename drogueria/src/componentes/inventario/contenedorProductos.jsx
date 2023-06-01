import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faMagnifyingGlass, faFilter, faTrash, faUserPen, faRotateRight} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { ModalRegister } from "./modalRegistro";
import axios from "axios";
import {SnackbarProvider, enqueueSnackbar } from "notistack";
import Swal from "sweetalert2";
import { Filtro } from "./filtro";
import { EditProduct } from "./editProduct";
import { BarInfo } from "./barraInfo";
import { Separador } from "../../toolsDev/separacion";

// eslint-disable-next-line react/prop-types
export const ContentComponents=()=>{
    //esconder menu de opciones
    const [esconder, setEsconder]=useState(false);
    const [seeModal, setSeeModal]=useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [data, setData] = useState([]);
    const [hay, setHay]=useState(false);
    const [filtro, setFiltro]=useState(false);
    const [buscarProd, setBuscarProd]=useState("");
    const [editModal, setEditModal]=useState(false);
    const [ProductToEdit, setProductToEdit]=useState({});


    // eslint-disable-next-line no-undef
    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    //get data to api
    useEffect(()=>{
        getApi();
    },[]);
   async function getApi(){
    try {
        await axios.get("http://localhost:2000/getproducts",)
        .then(res=>{
            setData(res.data.data);       
        });
    } catch (error) {
        enqueueSnackbar(error, {variant:"error"})
        
    }
        

   }
   
   //delete product and edit product

   function deleteOredit(e){
    if(e.target.parentNode.parentNode.className == "delet"){ 
           //nombre del producto
           const nombre=e.target
       .parentNode
       .parentNode
       .parentNode
       .querySelector(".texto")
       .textContent;

        Swal.fire({
            title:"desea eliminar el producto",
            icon:"warning",
            showCancelButton:true,
            confirmButtonColor:'#3085d6',
            cancelButtonColor:'#d33',
            confirmButtonText:'eliminar producto'
        }).then(res=>{
            if (res.isConfirmed) {
                //delete product
                deleteProduct(nombre);
            }
        });     
   }else if(e.target.parentNode.parentNode.className == "edit"){
    // names of the date to change  
    const nombre=e.target.parentNode.parentNode.parentNode.cells[1].textContent;
    const unidades=e.target.parentNode.parentNode.parentNode.cells[0].textContent;
    const laboratorio=e.target.parentNode.parentNode.parentNode.cells[2].textContent;
    const costo=e.target.parentNode.parentNode.parentNode.cells[3].textContent;
    const precio=e.target.parentNode.parentNode.parentNode.cells[4].textContent;
    //object
    const ProductToEdit={
        nombre:nombre,
        unidades:unidades,
        laboratorio:laboratorio,
        costo:costo,
        precio:precio
    }
    //insert object to component
      setProductToEdit(ProductToEdit)
    //Show modal
      if (editModal) {
        setEditModal(false);
      }else{
        setEditModal(true);
      }
   }
  } 
//request api delete
async function deleteProduct(producto){
    try {
        axios.delete(`http://localhost:2000/deleteproduct/${producto}`)
        .then(res=>{
            if(res.data.success){
                enqueueSnackbar("se elimino correctamente",{variant:"success"})
                getApi();
            }
        });
    } catch (err) {
       enqueueSnackbar(err,{variant:"error"})
    }
  }
  
          //comprovar si hay productos registrados para actualizar 
          useEffect(()=>{
           
            if (data.length <= 0) {
                setHay(false);
            }else{
                setHay(true);
            }
          },[data]);
          
          useEffect(()=>{
            if (buscarProd.length < 1 ) {
                getApi();
            }
          },[buscarProd])
          //// buscar producto

          async function buscador(){
            try {
                await axios.get(`http://localhost:2000/getproducts/buscar/${buscarProd}`)
                .then(res=>{
                    console.log(res.data.success)
                    if (res.data.success) {
                        setData(res.data.data);
                        enqueueSnackbar(`se encontro ${res.data.data[0].nombre}`,{variant:"info"});
                        
                    } else {
                        enqueueSnackbar(`no se encontro ${buscarProd}`,{variant:"error"});
                    }
                    

                })
            } catch (error) {
                enqueueSnackbar(error, {variant:"error"})

          }}

          /// filtrar producto 
         async function filtrarProduct(e){
            const product=JSON.stringify(e);
              try {
                await axios.get(`http://localhost:2000/getproducts/filtro/${product}`)
                .then(res =>{
                    if (res.data.success) {
                        setData(res.data.data)
                        enqueueSnackbar("productos encontrados", {variant:"success"})
                    }else{
                        enqueueSnackbar("no se encontro ningun producto",{variant:"info"})
                    }
                })
              } catch (error) {
                enqueueSnackbar(error, {variant:"error"})
              }
          }

          //componente

    return(
        <>
     
<div className="contentProductos ">
    <SnackbarProvider />
        
            <div className="contentOptionsNav">
                <div className={!esconder?"buttonsOptionsNav":"buttonsOptionsNav translate"}>
                        <span onClick={()=>seeModal?setSeeModal(false):setSeeModal(true)} className="register "> registrar productos</span>
                        <span onClick={()=>filtro?setFiltro(false):setFiltro(true)} className="btnFiltrar"> filtrar<FontAwesomeIcon className="ps-2" icon={faFilter}></FontAwesomeIcon></span>
                        {/*mostrar filtro */}
                        <Filtro filtrarProduct={filtrarProduct} filtro={filtro}/>
                        {/* modal*/}
                        <ModalRegister getApi={getApi} seeModal={seeModal} setSeeModal={setSeeModal}></ModalRegister>
                        <EditProduct ProductToEdit={ProductToEdit} getApi={getApi} editModal={editModal} setEditModal={setEditModal} />
                </div>

                   <FontAwesomeIcon icon={faMagnifyingGlass} className={windowWidth >= 700?'esconderIcono':'imgOptionsSearch'} onClick={()=>!esconder&&setEsconder(true)}/>
                <div className={esconder?"searchOptionsNav":"searchOptionsNav translateSearch"}>
                    <FontAwesomeIcon  icon={faArrowRight} className={windowWidth >= 700?'esconderIcono':'mostrarFlecha'} onClick={()=>esconder&&setEsconder(false)}/>

                    <form action="" className="">
                        <input onChange={(e)=>setBuscarProd(e.target.value)} className="form-control form-control-sm mb-5 mt-5 buscador" type="search" name="buscadorOptionsNav" id="buscadorOptionsNav"/>
                        <input onClick={buscador} className="btn btn-dark btn-sm mb-5 mt-5" type="button" value="buscar"/>
                    </form>
                </div>
            </div>
            <div className="addProducts">
                <table className="productos">
                       <thead>
                        <tr className="headTable">
                            <th>unidades</th>
                            <th>nombre del producto</th>
                            <th>laboratorio</th>
                            <th>costo</th>
                            <th>precio</th>
                            <th></th>
                            <th onClick={()=>getApi()} className="recharge"><FontAwesomeIcon  className="fs-5" icon={faRotateRight} /></th>
                        </tr>   
                       </thead>             
                    <tbody className="bodyProducts">
                        {
                           hay?data.map(item=>{
                                return(
                                    <tr key={Math.random()}>
                                    <td>{item.unidades}</td>
                                    <td className="texto">{item.nombre}</td>
                                    <td>{item.laboratorio}</td>
                                    <td>{Separador(item.costo)}</td>
                                    <td>{Separador(item.precio)}</td>
                                    <td onClick={(e)=>deleteOredit(e)} className="delet"><FontAwesomeIcon icon={faTrash} /></td>
                                    <td onClick={(e)=>deleteOredit(e)} className="edit"><FontAwesomeIcon icon={faUserPen} /></td>
                                    </tr>
                                )
                            })
                            // eslint-disable-next-line react/no-unknown-property
                            :<tr><td colSpan={5} className="text-center">agrega un producto</td></tr>
                        }
                    </tbody>
                </table>
            </div>
                 {/* bar of Information*/}
                
        </div> 
         <BarInfo data={data}/>
        </>
    );
};