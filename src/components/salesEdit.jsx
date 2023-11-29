import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function SalesEdit(props) {
  const [isAdmin, setIsAdmin] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosInstance = axios.create({
    withCredentials: true,
  });

  const [codigo, setCodigo] = useState("0");
  const [codigoProducto, setCodigoProducto] = useState("0");
  const [nombreCliente, setNombreCliente] = useState("");
  const [telefonoCliente, setTelefonoCliente] = useState("0");
  const [email, setEmail] = useState("");
  const [fechaVenta, setFechaVenta] = useState("");
  const [cantidadVendida, setCantidadVendida] = useState("0");
  const [totalVenta, setTotalVenta] = useState("0");
  const [sales, setSales] = useState({});
  const [usersId, setUsersId] = useState("0");
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState({});

  useEffect(() => {
    axiosInstance
      .get("https://login-auth-xqc9.onrender.com/api/products/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  const getSalesById = async (id) => {
    try {
      const { data } = await axiosInstance.get(
        `https://login-auth-xqc9.onrender.com/api/sales/sales/${id}`
      );
      setSales(data);
      setNombreCliente(data.username);
      setCantidadVendida(data.cantidad);
      setTelefonoCliente(data.telefono);
      setTotalVenta(data.total_venta);
      setEmail(data.email);
      setCantidadVendida(data.cantidad_vendida);
      setCodigoProducto(data.codigo_producto);
      setCodigo(data.codigo);
      setUsersId(data.id_usuarios);
    } catch (error) {
      console.error(error);
    }
  };

  const getSales = async () => {
    try {
      const { data } = await axiosInstance.get(
        `https://login-auth-xqc9.onrender.com/sales/sales`
      );
      setSales(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getSalesById(id);
  }, [id]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axiosInstance.get(
          `https://login-auth-xqc9.onrender.com/api/auth/getUsers`
        );
        setUsers(data._user);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, []);

  useEffect(() => {
    let user = users.find((user) => user.id == usersId);
    if (user) {
        setNombreCliente(user.username);
        setTelefonoCliente(user.telefono);
        setEmail(user.email);
    }
    }, [usersId]);

  const handleUpdate = async () => {
    try {
      const response = await axiosInstance.patch(
        `https://login-auth-xqc9.onrender.com/api/sales/sales/${id}`,
        {
          codigo_producto: codigoProducto,
          cantidad_vendida: cantidadVendida,
          total_venta: totalVenta,
          id_usuarios: usersId,
        }
      );
      if (response.status === 204) {
        Swal.fire({
            icon: "success",
            title: "Venta actualizada con éxito",
            showConfirmButton: false,
            timer: 1500,
        }).then(() => {

            navigate("/salesView");
        });
      } else {
        console.error("Error updating the sale");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={"dark:bg-gray-900 pb-20 "}>
      <Navbar setIsAdmin={setIsAdmin} isAdmin={isAdmin} />

      <form className="max-w-sm mx-auto" style={{ gap: "1rem" }}>
        <div className="mb-5">
          <label
            htmlFor="base-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            ID Cliente
          </label>
          <select
            id="name-input"
            onChange={(e) => {
              setUsersId(e.target.value);
            }}
            value={usersId}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {users &&
              users.length > 0 &&
              users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-5">
          <label
            htmlFor="product-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Codigo Producto
          </label>
          <select
            id="product-input"
            onChange={(e) => {
              const selectedProduct = Object.values(products).find(
                (product) => product.id === Number(e.target.value)
              );
              if (selectedProduct) {
                setCodigoProducto(selectedProduct.id);
                // set other product properties if needed
              }
            }}
            value={codigoProducto}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {products &&
              Object.values(products).length > 0 &&
              Object.values(products).map((product) => (
                <option key={product.codigo} value={product.codigo}>
                  {product.codigo}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-5">
          <label
            htmlFor="base-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nombre del cliente
          </label>
          <input
            type="text"
            id="name-input"
            value={nombreCliente}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="base-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Telefono del cliente
          </label>
          <input
            type="text"
            id="name-input"
            value={telefonoCliente}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="base-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Correo del cliente
          </label>
          <input
            type="text"
            id="name-input"
            value={email}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Cantidad vendida
          </label>
          <input
            type="number"
            id="price-input"
            onChange={(e) => setCantidadVendida(e.target.value)}
            value={cantidadVendida}
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
 
        <div>
          <button
            onClick={id && handleUpdate}
            type="button"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            {id ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
export default SalesEdit;
