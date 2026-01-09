import { Layout } from "../Layout";
import { DashboardLayout } from "../dashboard/DashboardLayout";
import { ProductsManage } from "../dashboard/views/ProductsManage";
import { Home } from "../user/views/Home";
import { About } from "../user/views/About";
import { Products } from "../user/views/Products";
import { ProductDetail } from "../user/views/ProductDetail";
import { Login } from "../user/views/Login";
import { Navigate } from "react-router";

const getCookieToken = () => {
  const raw = document.cookie
    .split("; ")
    .find((row) => row.startsWith("ec-token="))
    ?.substring("ec-token=".length);

  return raw ? decodeURIComponent(raw) : null;
};

const RequireAuth = ({ children }) => {
  const token = getCookieToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "productDetail/:id",
        element: <ProductDetail />,
      },

      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: (
          <RequireAuth>
            <ProductsManage />
          </RequireAuth>
        ),
      },
    ],
  },
];
export default routes;
