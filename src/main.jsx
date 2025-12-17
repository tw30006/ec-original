import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Dashboard } from "./dashboard/views/Index.jsx";
import { BrowserRouter } from "react-router";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <main className="w-full mx-auto md:w-[90%]">
        <Dashboard />
      </main>
    </BrowserRouter>
  </StrictMode>
);
