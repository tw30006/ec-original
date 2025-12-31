import ring from "../../assets/images/ring-7.jpg";
import { ProductModal } from "../components/ProductModal";
import { useState } from "react";
export function Dashboard() {
  const [showOpen, setShowOpen] = useState(false);

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
                  數量
                </th>
                <th scope="col" className="col-span-2 md:col-span-1 text-left">
                  狀態
                </th>
              </tr>
            </thead>
            <tbody className="flex flex-col gap-3">
              <tr className="grid grid-cols-12 items-center">
                <td className="hidden md:block md:col-span-3">
                  <img
                    src={ring}
                    alt="ring"
                    className="w-[150px] xl:w-[200px] h-full object-cover"
                  />
                </td>
                <td className="col-span-3 md:col-span-3 text-xl">戒指</td>
                <td className="hidden xl:block md:col-span-2">$42,000</td>
                <td className="col-span-3 md:col-span-2 xl:col-span-1">
                  $38,000
                </td>
                <td className="col-span-2 pl-3 md:col-span-1 md:pl-0">2</td>
                <td className="col-span-2 md:col-span-1">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="toggle toggle-warning"
                  />
                </td>
                <td className="col-span-2 md:col-span-1 material-symbols-outlined text-center">
                  more_vert
                </td>
              </tr>
              <tr className="grid grid-cols-12 items-center">
                <td className="hidden md:block md:col-span-3">
                  <img
                    src={ring}
                    alt="ring"
                    className="w-[150px] xl:w-[200px] h-full object-cover"
                  />
                </td>
                <td className="col-span-3 md:col-span-3 text-xl">戒指</td>
                <td className="hidden xl:block md:col-span-2">$42,000</td>
                <td className="col-span-3 md:col-span-2 xl:col-span-1">
                  $38,000
                </td>
                <td className="col-span-2 pl-3 md:col-span-1 md:pl-0">2</td>
                <td className="col-span-2 md:col-span-1">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="toggle toggle-warning"
                  />
                </td>
                <td className="col-span-2 md:col-span-1 material-symbols-outlined text-center">
                  more_vert
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      {showOpen === true && (
        <ProductModal closeModal={() => setShowOpen(false)} />
      )}
    </>
  );
}
