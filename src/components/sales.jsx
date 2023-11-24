import { useEffect, useState} from "react";
import Navbar from "./navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Sales() {
  const axiosInstance = axios.create({
    withCredentials: true,
  })

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const {id } = useParams();
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    axiosInstance
      .get("http://localhost:1200/api/products/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

 

  useEffect(() => {
    if (id) {
      getProduct();
    }
  },[])

  const getProduct = async () => {
    try {
      const response = await axiosInstance.get(`http://localhost:1200/api/products/products/${id}`);
      setNombre(response.data.nombre);
      setDescripcion(response.data.descripcion);
      setPrecio(response.data.precio);
      setCantidad(response.data.cantidad);
    } catch (error) {
      console.log(error);
    }
  }
  const createSale = async (
    codigo_producto,
    fecha_venta,
    cantidad_vendida,
    total_venta
  ) => {
    try {
      const response = await axiosInstance.post(
        "http://localhost:1200/api/sales/sales/",
        {
          codigo_producto,
          nombre_cliente,
          telefono_cliente,
          fecha_venta,
          cantidad_vendida,
          total_venta
        }
      );
        
 
      if (response.status === 200) {
        console.log("Producto creado con éxito");
      } else {
        console.error("Error al crear el producto");
      }
    } catch (error) {
      console.log(error);
      console.error("Error al crear el producto");
    }
  };

  const handleSubmit = (codigo) => {
    // Llamar a la función createProduct con los valores obtenidos
    navigate(`/sales/${codigo}`);
  };

  return (
    <>
      <Navbar setIsAdmin={setIsAdmin} isAdmin={isAdmin}/>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th
                      scope="col"
                      className="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Codigo
                    </th>
                    <th
                      scope="col"
                      className="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Nombre
                    </th>
                    <th
                      scope="col"
                      className="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Descripcion
                    </th>
                    <th
                      scope="col"
                      className="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Precio
                    </th>
                    <th
                      scope="col"
                      className="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Cantidad
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Comprar
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr>
                      <td className="border-r px-6 py-4 dark:border-neutral-500">
                        {product.codigo}
                      </td>
                      <td className="border-r px-6 py-4 dark:border-neutral-500">
                        {product.nombre}
                      </td>
                      <td className="border-r px-6 py-4 dark:border-neutral-500">
                        {product.descripcion}
                      </td>
                      <td className="border-r px-6 py-4 dark:border-neutral-500">
                        {product.precio}
                      </td>
                      <td className="border-r px-6 py-4 dark:border-neutral-500">
                        {product.cantidad}
                      </td>
                      <td>
                        <a
                          href="#"
                          onClick={() => {
                            handleSubmit(product.codigo);
                          }}
                          className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                          aria-current="page"
                        >
                          Buy
                        </a>
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

export default Sales;
