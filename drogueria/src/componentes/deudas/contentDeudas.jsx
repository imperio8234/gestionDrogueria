import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faMagnifyingGlass, faFilter,faPlus,faMinus , faRotateRight} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { ModalRegister } from "./components/modalRegistroDeuda";
import axios from "axios"; 
import {SnackbarProvider, enqueueSnackbar } from "notistack";
import Swal from "sweetalert2";
import "../../css/home/creditos.css/creditos.css";
import { Historial } from "./components/historial";
import { Filtro } from "./components/filtroDeuda";
import { EditCustomer } from "./components/editCustomerCredit";
import { AddRecord } from "./components/compontsRecord/addRecord";
import { SubstractRecord } from "./components/compontsRecord/subtractRecord";
import { Pages } from "../creditos/components/compontsRecord/paginacion";
import { arrayConverter } from "../../toolsDev/arrayConverter";
import { BarInfo } from "../creditos/components/compontsRecord/infoBarr";
import { Search } from "./components/compontsRecord/browser";
import { Botones } from "../creditos/BOTONES.JSX";

//import { BarInfo } from "./barraInfo";
//import { Separador } from "../../toolsDev/separacion";

// eslint-disable-next-line react/prop-types
export const ContentDeudas=()=>{
    //esconder menu de opciones
    const [esconder, setEsconder] = useState(false);
    const [seeModal, setSeeModal] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [data, setData] = useState([]);
    const [hay, setHay] = useState(false);
    const [filtro, setFiltro] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [customerEdit, setcustomerEdit] = useState({});
    const [elementoSeleccionado, setElementoSeleccionado] = useState();
    const [showRecord, setShowRecord] = useState(false);
    const[sendNameRecord, setSendNameRecord] = useState();
    const [idDeuda, setIdDeuda] = useState("");
    const [showAddRecord, setShowAddRecord]= useState(false);
    const [showSubstractRecord, setShowSubstractRecord]= useState(false);
    const [paginas, setPaginas]= useState([]);
    const [getpage, setGetPage]= useState(1);

    // eslint-disable-next-line no-undef

    //codigo para verificar el tamaño de la pantalla
    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
         
    }, []);
   useEffect(() =>{
    if (windowWidth >= 700) {
      setElementoSeleccionado(null)
    } 
   },[windowWidth])
    

    //get data to api
    useEffect(()=>{
        getApi();
    },[getpage]);


   async function getApi(){
    try {
        await axios.get("http://localhost:2000/api/v1/deudas/1",{withCredentials:true})
        .then(res=>{             
            if (res.data.success) {
              setData(res.data.data.data);
              setPaginas(arrayConverter(res.data.paginas.paginas < 2 && 1));   

            } else {
             enqueueSnackbar(res.data.message, {variant: "error"})
            }     
        });
    } catch (error) {
        enqueueSnackbar(error, {variant:"error"});
        if(error.response.status == 401){
          alert("inicia sesion");
          localStorage.removeItem("user");
          location.reload();
          
      }
        
    }
   }

   //delete product and edit product show record addRecord controller
   function handlerClick(e, id_Deuda){
    const id = windowWidth < 700?elementoSeleccionado : id_Deuda
    const customerToEdit= data.find(obj => obj.id_deuda ===  id);
    if(e == "delet"){ 
      // eliminar producto
        Swal.fire({
            title:`desea eliminar a ${customerToEdit.nombre}`,
            icon:"warning",
            showCancelButton:true,
            confirmButtonColor:'#3085d6',
            cancelButtonColor:'#d33',
            confirmButtonText:'eliminar cliente'
        }).then(res=>{
            if (res.isConfirmed) {

              //delete product
                deleteProduct(id_Deuda, customerToEdit.nombre);
            }
        }); 
        
   }else if(e == "edit"){    
     // names of the date to change  
          setcustomerEdit(customerToEdit);
          setIdDeuda(id);

          //Show modal
      if (editModal) {
        setEditModal(false);
      }else{
        setEditModal(true);
      }

      // events record      
   }else if(e == "historial"){
    showRecord?setShowRecord(false):setShowRecord(true);
    !showRecord && setShowAddRecord(false), setShowSubstractRecord(false);
   
    // datos del cliente registrado 
    setIdDeuda(id);
    setSendNameRecord(customerToEdit.nombre);

   }else if (e == "sumar") {

    // addrecordcomponent
    showAddRecord?setShowAddRecord(false):setShowAddRecord(true);
    !showAddRecord && setShowRecord(false), setShowSubstractRecord(false);
    
    setSendNameRecord(customerToEdit.nombre);
    setIdDeuda(id);
   }else if(e == "abonar") {
    showSubstractRecord?setShowSubstractRecord(false): setShowSubstractRecord(true);
    setSendNameRecord(customerToEdit.nombre);
    setIdDeuda(id);
    !showSubstractRecord && setShowRecord(false), setShowAddRecord(false)
   } else {
    console.log("no hay botones que coincidan")
   }
   
  }
  
  //mostrar menu de botones del usuario registrado 
  function  showBtn(index){
    
    
   // handlerClick(accion, index)
    setElementoSeleccionado(index)
    console.log(elementoSeleccionado, "esto estra bien")
   if (elementoSeleccionado) {
    setElementoSeleccionado(null)
   }
  }


//request api delete
async function deleteProduct(cliente, nombre){
    try {
        axios.delete(`http://localhost:2000/api/v1/deudas/${cliente}`,{withCredentials: true})
        .then(res=>{
            if(res.data.success){
                enqueueSnackbar(`se elimino a ${nombre} correctamente`,{variant:"success"})
                getApi();
            } else {
                enqueueSnackbar( `${res.data.message} no se puede elimiar`,{variant:"info"});
            }
        });
    } catch (err) {
       enqueueSnackbar(err,{variant:"error"});
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

          /// filtrar producto 
         async function filtrarProduct(e){
            const product=JSON.stringify(e);
              try {
                await axios.get(`http://localhost:2000/getproducts/filtro/${product}`)
                .then(res =>{
                    if (res.data.success) {
                        setData(res.data.data);
                        enqueueSnackbar("se encontro la deuda", {variant:"success"})
                    }else{
                        enqueueSnackbar("no se encontro ninguna deuda",{variant:"info"});
                    }
                })
              } catch (error) {
                enqueueSnackbar(error, {variant:"error"});
              }
          }

          //componente
  return (
  <>
    <div className="contentProductos">
      <SnackbarProvider />

      <div className="contentOptionsNav">
        <div className={!esconder ? "buttonsOptionsNav" : "buttonsOptionsNav translate"}>
          <span onClick={() => seeModal ? setSeeModal(false) : setSeeModal(true)} className="register">registrar Deuda</span>
          <span onClick={() => filtro ? setFiltro(false) : setFiltro(true)} className="btnFiltrar">filtrar<FontAwesomeIcon className="ps-2" icon={faFilter}></FontAwesomeIcon></span>

          {/* mostrar filtro */}
          <Filtro filtrarProduct={filtrarProduct} filtro={filtro} />

          {/* modal */}
          <ModalRegister getApi={getApi} seeModal={seeModal} setSeeModal={setSeeModal}></ModalRegister>
          <EditCustomer idDeuda={idDeuda} customerEdit={customerEdit} getApi={getApi} editModal={editModal} setEditModal={setEditModal} />
        </div>

        <FontAwesomeIcon icon={faMagnifyingGlass} className={windowWidth >= 700 || esconder? 'esconderIcono' : 'imgOptionsSearch'} onClick={() => !esconder && setEsconder(true)} />

        <div className={esconder ? "searchOptionsNav" : "searchOptionsNav translateSearch"}>
          <FontAwesomeIcon icon={faArrowRight} className={windowWidth >= 700 ? 'esconderIcono' : 'mostrarFlecha'} onClick={() => esconder && setEsconder(false)} />
          <Search getApi={getApi} setData={setData}></Search>
        </div>
      </div>

      <div className="addProducts">
        <table className="productos">
          <thead>
            <tr className="headTable text-center">
              <th>DEUDA</th>
              <th>CELULAR</th>
              <th>FECHA</th>
              <th>VALOR</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th onClick={() => getApi()} className="recharge"><FontAwesomeIcon className="fs-5" icon={faRotateRight} /></th>
            </tr>
          </thead>
          <tbody className="bodyProducts">
            {
              hay ? data.map((item) => {
                return (
                  <tr  key={item.id_Deuda}>
                    <td>{item.nombre}</td>
                    <td className="texto">{item.celular}</td>
                    <td>{item.fecha.split(" ")[0]}</td>
                    <td className="valorCred">{item.valor}</td>
                    <td className="w-50" rowSpan={1}><FontAwesomeIcon onClick={() => showBtn(item.id_deuda)} className={windowWidth <= 700 ?"tools": "d-none"} icon={elementoSeleccionado == item.id_deuda ? faMinus:faPlus  }/> {elementoSeleccionado == item.id_deuda  ? <Botones handlerClick={handlerClick} item={item.id_deuda} seleccionado={elementoSeleccionado} clase ={windowWidth <= 700 ?"d-none":"contBotonMobil"}/>: null}{windowWidth <= 700 ?null : <Botones item={item.id_deuda} handlerClick={handlerClick} />}</td>     
                  </tr>
                )
              })
                // eslint-disable-next-line react/no-unknown-property
                : <tr><td colSpan={5} className="text-center">agrega un registro</td></tr>
            }
          </tbody>
        </table>

        {/* historial */}
        {showRecord && <Historial idDeuda={idDeuda} sendNameRecord={sendNameRecord} showRecord={showRecord} setShowRecord={setShowRecord}></Historial>}

        {/* sumar a el Deuda y abonar */}
        <AddRecord idDeuda={idDeuda} showAddRecord={showAddRecord} setShowAddRecord={setShowAddRecord} sendNameRecord={sendNameRecord} />
        <SubstractRecord idDeuda={idDeuda} showSubstractRecord={showSubstractRecord} setShowSubstractRecord={setShowSubstractRecord} sendNameRecord={sendNameRecord}></SubstractRecord>
      </div>
      <Pages setGetPage={setGetPage} paginas={paginas}/>
      <BarInfo></BarInfo>
    </div>

    {/* <BarInfo data={data} />bar of Information */}
  </>
);

};