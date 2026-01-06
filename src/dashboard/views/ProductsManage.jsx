import { ProductModal } from "../components/ProductModal";
import { useState, useEffect } from "react";
export function ProductsManage() {
  const [showOpen, setShowOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("ec-token="))
    ?.substring("ec-token=".length);

  const decodedToken = token ? decodeURIComponent(token) : null;

  const apiUrl = import.meta.env.VITE_APP;
  const apiPath = import.meta.env.VITE_APP_PATH;
  const getProducts = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/${apiPath}/admin/products`, {
        method: "GET",
        headers: {
          Authorization: decodedToken,
        },
      });
      const data = await res.json();
      if (data.success === true) {
        setProducts(data.products);
      } else {
        console.log("取得商品失敗");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCheckLogin = async () => {
    if (!decodedToken) {
      navigate("/login");
      setError("請先登入");
      return;
    }
    try {
      const res = await fetch(`${apiUrl}/api/user/check`, {
        method: "POST",
        headers: {
          Authorization: decodedToken,
        },
      });
      const data = await res.json();
      if (data.success) {
        getProducts();
      }
    } catch (error) {
      setError("身分驗證失敗");
    }
  };

  useEffect(() => {
    handleCheckLogin();
  }, []);

  return (
    <>
      <section className="mx-auto">
        <div className="px-5 md:px-0 w-full mx-auto">
          <div className="flex justify-end mb-5">
            <button
              className="btn btn-outline btn-warning text-xl"
              onClick={() => setShowOpen(true)}
            >
              新增商品
            </button>
          </div>
          <table className="w-full table-auto">
            <thead>
              <tr className="grid grid-cols-12 border-b py-2 mb-2 text-xl">
                <th
                  scope="col"
                  className="md:col-span-3 md:text-left hidden md:block"
                >
                  圖片
                </th>
                <th scope="col" className="col-span-3 text-left">
                  名稱
                </th>
                <th
                  scope="col"
                  className="hidden xl:block md:col-span-2 text-left"
                >
                  原價
                </th>
                <th
                  scope="col"
                  className="col-span-3 md:col-span-2 xl:col-span-1 text-left text-red-500"
                >
                  售價
                </th>
                <th scope="col" className="col-span-2 md:col-span-1 text-left">
                  庫存
                </th>
                <th scope="col" className="col-span-2 md:col-span-1 text-left">
                  狀態
                </th>
              </tr>
            </thead>
            <tbody className="flex flex-col gap-3">
              {products.map((product) => (
                <tr key={product.id} className="grid grid-cols-12 items-center">
                  <td className="hidden md:block md:col-span-3">
                    <img
                      src={product.imageUrl}
                      alt="ring"
                      className="w-[150px] xl:w-[200px] h-full object-cover"
                    />
                  </td>
                  <td className="col-span-3 md:col-span-3 text-xl">
                    {product.title}
                  </td>
                  <td className="hidden xl:block md:col-span-2">$0</td>
                  <td className="col-span-3 md:col-span-2 xl:col-span-1">
                    ${product.price}
                  </td>
                  <td className="col-span-2 pl-3 md:col-span-1 md:pl-0">
                    {product.num}
                    {product.unit}
                  </td>
                  <td className="col-span-2 md:col-span-1">
                    <input
                      type="checkbox"
                      defaultChecked={product.is_enabled}
                      className="toggle toggle-warning"
                    />
                  </td>
                  <td className="col-span-2 md:col-span-1 material-symbols-outlined text-center">
                    more_vert
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {showOpen === true && (
        <ProductModal closeModal={() => setShowOpen(false)} decodedToken={decodedToken} />
      )}
    </>
  );
}
