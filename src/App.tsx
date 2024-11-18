import { BrowserRouter, Route, Routes } from "react-router-dom";
import UIProvider from "components/ui/provider";
import publicRoutes from "routes/public";
import { Suspense } from "react";

const routesList = [...publicRoutes];

function App() {
  return (
    <BrowserRouter>
      <UIProvider>
        <Routes>
          {routesList.map((route) => (
            <Route
              key={route.pathname}
              path={route.pathname}
              element={
                <Suspense fallback={route.fallback}>
                  <route.element />
                </Suspense>
              }
            />
          ))}
        </Routes>
      </UIProvider>
    </BrowserRouter>
  );
}

export default App;
