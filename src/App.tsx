import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UIProvider from "@components/ui/provider";
import publicRoutes from "@routes/public";

const queryClient = new QueryClient();

const routesList = [...publicRoutes];

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UIProvider>
          <Routes>
            {routesList.map((route) => (
              <Route
                key={route.pathname}
                path={route.pathname}
                element={<route.element />}
              />
            ))}
          </Routes>
        </UIProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
