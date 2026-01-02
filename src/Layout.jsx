import { Outlet, Link } from "react-router";

export function Layout() {
  const hasToken = document.cookie
    .split("; ")
    .some((row) => row.startsWith("ec-token="));

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-200/50 text-white">
        <div className="w-full mx-auto md:w-[90%]">
          <nav className="flex justify-end text-xl">
            <Link to="/" className="p-2 hover:bg-yellow-500 hover:text-black">
              首頁
            </Link>
            <Link
              to="/products"
              className="p-2 hover:bg-yellow-500 hover:text-black"
            >
              全部商品
            </Link>
            <Link
              to="/about"
              className="p-2 hover:bg-yellow-500 hover:text-black"
            >
              關於
            </Link>
            <Link
              to={hasToken ? "/dashboard" : "/login"}
              className="p-2 hover:bg-yellow-500 hover:text-black"
            >
              後台管理
            </Link>
          </nav>
        </div>
      </header>
      <main className="w-full mx-auto md:w-[90%] flex-1 py-15">
        <Outlet />
      </main>
      <footer className="footer sm:footer-horizontal footer-center bg-blue-200/50 text-black p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by ACME
            Industries Ltd
          </p>
        </aside>
      </footer>
    </div>
  );
}
