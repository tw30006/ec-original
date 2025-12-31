import { useLocation } from "react-router";
export function ProductDetail() {
  const { product } = useLocation().state;
  console.log(product);
  console.log(useLocation().state);
  return (
    <>
      <div className="xl:w-[960px] mx-auto">
        <div className="mb-5">
          <Navbar />
        </div>
        <section className="grid grid-cols-2 mb-10 gap-5">
          <div>
            <img src={product.imageUrl} alt={product.title} />
            {/* <div className="grid grid-cols-2 gap-2">
              <img src={ring} alt="" className="" />
              <img src={ring} alt="" />
            </div> */}
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl text-white font-bold">{product.title}</h2>
            <p className="text-2xl text-yellow-500 font-bold">
              NT${product.price}
            </p>
            <div className="flex items-center">
              <span className="material-symbols-outlined p-1 border cursor-pointer">
                remove
              </span>
              <span className="w-[70px] border-y p-1 text-center">1</span>
              <span className="material-symbols-outlined p-1 border cursor-pointer">
                add
              </span>
            </div>
            <div className="flex gap-4">
              <button className="py-2 px-3 text-lg bg-sky-900 hover:bg-sky-700 rounded-sm text-white cursor-pointer">
                收藏
              </button>
              <button className="py-2 px-3 text-lg bg-sky-900 hover:bg-sky-700 rounded-sm text-white cursor-pointer">
                加入購物車
              </button>
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-4">
          <ul className="flex gap-4">
            <li className="text-lg text-white p-2 bg-yellow-800 rounded-md cursor-pointer">
              設計想法
            </li>
            <li className="text-lg text-white p-2 border border-yellow-800 rounded-md cursor-pointer">
              產品規格
            </li>
            <li className="text-lg text-white p-2 border border-yellow-800 rounded-md cursor-pointer">
              注意事項
            </li>
          </ul>
          <div className="border-2 border-yellow-800 rounded-md w-[500px] bg-slate-100">
            <p className="p-3 text-slate-900 leading-[1.5] text-lg">
              {product.description}
            </p>
          </div>
        </section>
      </div>
      <Toast />
    </>
  );
}
