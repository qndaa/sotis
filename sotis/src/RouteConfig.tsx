import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./containers/Login/Login";
import { PAGE_ROUTES } from "./PageRoutes";

const RouteConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PAGE_ROUTES.LOGIN} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteConfig;
