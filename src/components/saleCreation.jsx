import Navbar from "./navbar";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function SaleCreation(props) {
  const [codigoProducto, setCodigoProducto] = useState('');
  const [cantidadVendida, setCantidadVendida] = useState('');
  const [totalVenta, setTotalVenta] = useState('0');
  const [producto, setProducto] = useState({});

  const {id } = useParams();

  useEffect(() => {
    if (id) {
      getProduct();
    } else {
        const navigate = useNavigate();
        navigate('/sales');
    }
  },[])

  useEffect(() => {
    
    setTotalVenta(cantidadVendida * producto.precio);
  }, [cantidadVendida])



  const getProduct = async () => {
    try {
      const axiosInstance = axios.create({
        withCredentials: true
      })
      const response = await axiosInstance.get(`http://localhost:1200/api/products/products/${id}`);
      if (response.data) {

        setProducto(response.data)
        setCodigoProducto(response.data.codigo)
      } else {
        navigate('/sales');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdate = () => {
    createSale();
  }

  const createSale = async () => {
    try {
      const axiosInstance = axios.create({
        withCredentials: true
      })
      const response = await axiosInstance.post('http://localhost:1200/api/sales/sales/', {
        codigo_producto: codigoProducto,
        cantidad_vendida: cantidadVendida,
        total_venta: totalVenta,
      });
  
      if (response.status === 200) {
        console.log('Venta creada con éxito');
      } else {
        console.error('Error al crear venta');
      }
    } catch (error) {
      console.log(error)
      console.error('Error al crear venta');
    }
  };

  return (
    <div className={"dark:bg-gray-900 pb-20 "}>
      <Navbar />

      <form   className="max-w-sm mx-auto" style={{gap: "1rem"}}>
    
        <div className="mb-5  dark:text-white">
          <label
            htmlFor="base-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product Name
          </label>
         {producto.nombre || "No tiene nombre"}
        </div>
        <div className="mb-5  dark:text-white">
          <label
            htmlFor="large-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
           Product Description
          </label>
          
         {producto.descripcion || "No tiene descripción"}
        </div>
        <div className="mb-5 dark:text-white">
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Precio unitario
          </label>
          {producto.precio || "No tiene precio"}
        </div>
        <div className="mb-5 dark:text-white">
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Cantidad en Stock
          </label>
          {producto.cantidad || "No tiene stock"}
        </div>
        <div className="mb-5 dark:text-white">
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Cantidad a comprar
          </label>
          <input
            type="number"
            id="price-input"
            required
            onChange={(e) => {
              if (e.target.value > producto.cantidad) {
                setCantidadVendida(producto.cantidad);
              } else {
                setCantidadVendida(e.target.value);
              }
            }}
            max={producto.cantidad}
            value={cantidadVendida}
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5 dark:text-white">
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Total venta
          </label>
          {producto.precio * cantidadVendida || "No tiene precio"}
        </div>
        <div >
         <button onClick={handleUpdate} type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Comprar</button>
        
        </div>
      </form>
    </div>
  );
}
export default SaleCreation;
