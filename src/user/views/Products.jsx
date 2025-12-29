import data from "../../assets/productData.json";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
export function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const gotoProductDetail = (product) => {
    navigate(`/productDetail/${product.id}`, { state: { product } });
  };

  useEffect(() => {
    setProducts(data);
  }, []);
  return (
    <>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {products.map((product) => {
          return (
            <>
              <div
                className="bg-base-100 shadow-sm rounded-md bg-white flex flex-col h-full cursor-pointer"
                onClick={() => gotoProductDetail(product)}
              >
                <div className="">
                  <img
                    className="w-full h-[300px] rounded-t-md mb-2 object-cover"
                    src={product.imageUrl}
                  />
                </div>
                <div className="p-2 flex flex-col flex-grow gap-4 mb-2">
                  <h2 className="text-2xl text-black font-bold">
                    {product.title}
                  </h2>
                  <p className="text-lg text-black">{product.description}</p>
                  <div className="flex item-center justify-between mt-auto">
                    <p className="text-2xl text-cyan-600 font-bold">
                      NT${product.price}
                    </p>
                    <button
                      type="button"
                      className="py-2 px-3 bg-sky-900 hover:bg-sky-700 rounded-sm text-white cursor-pointer"
                    >
                      加入購物車
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
