import { BrowserRouter, Routes, Route } from "react-router-dom";
import PAGE_ROUTES from "./pageRoutes";
import Login from "./containers/LoginPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path={PAGE_ROUTES.HOME} element={<Home />} /> */}
          <Route path="/" element={<App />} />
          <Route path={PAGE_ROUTES} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
