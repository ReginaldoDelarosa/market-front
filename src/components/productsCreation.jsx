import Navbar from "./navbar";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function ProductsCreation(props) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('0');
  const [cantidad, setCantidad] = useState('0');

  const {id } = useParams();

  useEffect(() => {
    if (id) {
      getProduct();
    }
  },[])

  const getProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:1200/api/products/products/${id}`);
      setNombre(response.data.nombre);
      setDescripcion(response.data.descripcion);
      setPrecio(response.data.precio);
      setCantidad(response.data.cantidad);
    } catch (error) {
      console.log(error);
    }
  }
  const handleSubmit = () => {
    // Llamar a la función createProduct con los valores obtenidos
    createProduct(nombre, descripcion, precio, cantidad);
   
  };
  const handleUpdate = () => {
    updateProduct(nombre, descripcion,precio, cantidad);
  }

  const createProduct = async (nombre, descripcion, precio, cantidad) => {
    try {
      const response = await axios.post('http://localhost:1200/api/products/products/', {
        nombre,
        descripcion,
        precio,
        cantidad,
      });
  
      if (response.status === 200) {
        console.log('Producto creado con éxito');
      } else {
        console.error('Error al crear el producto');
      }
    } catch (error) {
      console.log(error)
      console.error('Error al crear el producto');
    }
  };
  const updateProduct = async (nombre, descripcion, precio, cantidad) => {
    try {
      const response = await axios.patch(`http://localhost:1200/api/products/products/${id}`, {
        nombre,
        descripcion,
        precio,
        cantidad,
      });
  
      if (response.status === 204) {
        console.log('Producto creado con éxito');
      } else {
        console.error('Error al actualizar el producto');
      }
    } catch (error) {
      console.log(error)
      console.error('Error al actualizar el producto');
    }
  };

  return (
    <div className={"dark:bg-gray-900 pb-20 "}>
      <Navbar />

      <form   className="max-w-sm mx-auto" style={{gap: "1rem"}}>
    
        <div className="mb-5">
          <label
            htmlFor="base-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name-input"
            onChange={(e) => setNombre(e.target.value)}
            value={nombre}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="large-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
           Product Description
          </label>
          <input
            type="text"
            id="description-input"
            onChange={(e) => setDescripcion(e.target.value)}
            value={descripcion}
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product Price
          </label>
          <input
            type="number"
            id="price-input"
            onChange={(e) => setPrecio(e.target.value)}
            value={precio}
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product Quantity
          </label>
          <input
            type="number"
            id="small-input"
            onChange={(e) => setCantidad(e.target.value)}
            value={cantidad}
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />

        </div>
        <div >
         <button onClick={id ? handleUpdate : handleSubmit} type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">{id ? "Update" : "Create"}</button>
        
        </div>
      </form>
    </div>
  );
}
export default ProductsCreation;
