import { Layout } from "../Layout";
import { Dashboard } from "../dashboard/views/Index";
import { Home } from "../user/views/Home";
import { About } from "../user/views/About";
import { Products } from "../user/views/Products";
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
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
];
export default routes;
