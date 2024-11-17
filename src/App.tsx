import { BrowserRouter, Route, Routes } from "react-router-dom";
import UIProvider from "components/ui/provider";
import publicRoutes from "routes/public";

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
              element={<route.element />}
            />
          ))}
        </Routes>
      </UIProvider>
    </BrowserRouter>
  );
}

export default App;
