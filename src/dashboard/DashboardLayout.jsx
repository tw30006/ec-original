import { Outlet } from "react-router";
import { DashboardHeader } from "./components/Header";
export function DashboardLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
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
