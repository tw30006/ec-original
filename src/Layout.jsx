import { Outlet, Link } from "react-router";

export function Layout() {
  return (
    <>
      <header className="bg-blue-200 opacity-50 py-2">
        <div className="w-full mx-auto md:w-[90%]">
          <nav className="flex justify-end gap-2">
            <Link to="/">首頁</Link>
            <Link to="/products">全部商品</Link>
            <Link to="/about">關於</Link>
            <Link to="/dashboard">後台管理</Link>
          </nav>
        </div>
      </header>
      <main className="w-full mx-auto md:w-[90%]">
        <Outlet />
      </main>
      <footer className="text-center bg-blue-200 opacity-50">作品集使用</footer>
    </>
  );
}
