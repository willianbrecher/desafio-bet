import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";

import Router from "./pages/Router.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { initApi } from "./utils/initApi.ts";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext .tsx";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';       

const queryClient = new QueryClient();
initApi();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider>
      <AuthProvider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <Router />
          </QueryClientProvider>
        </BrowserRouter>
      </AuthProvider>
    </PrimeReactProvider>
  </StrictMode>
);
