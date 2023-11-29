import { useEffect, useState } from "react";
import Navbar from "./navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function SalesView() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [userStatus, setUserStatus] = useState(null);
  const axiosInstance = axios.create({
    withCredentials: true,
  })
  useEffect(() => {
  
    axiosInstance
      .get("https://login-auth-xqc9.onrender.com/api/sales/sales")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      getUser();
      console.log(products);
      if (userStatus === 0) {
        navigate("/products");
      }
  }, [userStatus]);

  const deleteProduct = async (id) => {
    try {
      await axiosInstance.delete(`https://login-auth-xqc9.onrender.com/api/sales/sales/${id}`);
      setProducts(products.filter((product) => product.codigo !== id));
    } catch (error) {
      console.log(error);
    }
  }
  const getUser = async () => {
    try {
      const { data } = await axiosInstance.post(
        "https://login-auth-xqc9.onrender.com/api/auth/getUser"
      );
      if (setIsAdmin) {
        setIsAdmin(data.user.status);
        setUserStatus(data.user.status);

      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar setIsAdmin={setIsAdmin} isAdmin={isAdmin}/>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                <thead class="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th
                      scope="col"
                      class="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Codigo
                    </th>
                    <th
                      scope="col"
                      class="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Codigo Producto
                    </th>
                    <th
                      scope="col"
                      class="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Nombre del cliente
                    </th>
                    <th
                      scope="col"
                      class="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Telefono del cliente
                    </th>
                    <th
                      scope="col"
                      class="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Correo del cliente </th>
                    <th
                      scope="col"
                      class="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Fecha de venta
                    </th>
                    <th scope="col" class="border-r px-6 py-4 dark:border-neutral-500"
                      
                    >
                      Cantidad vendida
                    </th>
        
                    <th scope="col" class="border-r px-6 py-4 dark:border-neutral-500">
                      Total venta
                    </th>

                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr>
                      <td class="border-r px-6 py-4 dark:border-neutral-500">
                        {product.codigo}
                      </td>
                      <td class="border-r px-6 py-4 dark:border-neutral-500">
                        {product.codigo_producto}
                      </td>
                      <td class="border-r px-6 py-4 dark:border-neutral-500">
                        {product.username}
                      </td>
                      <td class="border-r px-6 py-4 dark:border-neutral-500">
                        {product.telefono}
                      </td>
                      <td class="border-r px-6 py-4 dark:border-neutral-500">
                        {product.email}
                      </td>
                      <td class="border-r px-6 py-4 dark:border-neutral-500">
                        {product.fecha_venta}
                      </td>
                      <td class="border-r px-6 py-4 dark:border-neutral-500">
                        {product.cantidad_vendida}
                      </td>
                      <td class="border-r px-6 py-4 dark:border-neutral-500">
                        {product.total_venta}
                      </td>
                      {isAdmin ? <td>
                        <button
                          onClick={() => navigate("/editSale/" + product.codigo)}
                          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteProduct(product.codigo)}
                          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Delete
                        </button>
                      </td> : <></>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SalesView;
