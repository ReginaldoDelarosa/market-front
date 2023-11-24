import { useEffect, useState } from "react";
import Navbar from "./navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function SalesView() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const axiosInstance = axios.create({
      withCredentials: true,
    })
    axiosInstance
      .get("http://localhost:1200/api/sales/sales")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />
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
                        {product.fecha_venta}
                      </td>
                      <td class="border-r px-6 py-4 dark:border-neutral-500">
                        {product.cantidad_vendida}
                      </td>
                      <td class="border-r px-6 py-4 dark:border-neutral-500">
                        {product.total_venta}
                      </td>
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
