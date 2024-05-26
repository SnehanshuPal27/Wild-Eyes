import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddCarPage from "./pages/AddCarPage";

import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/PrivateRoutes";
import Navbar from "./components/Navbar";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import Logout from "./components/Logout";
import Footer1 from "./components/Footer1";
import CarListPage from "./pages/CarListPage";
import AddPlantPage from "./pages/AddPlantPage";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        {/* <Route element={<PrivateRoute />}> */}
          <Route path="/add-animal" element={<AddCarPage />} />
          <Route path="/add-plant" element={<AddPlantPage />} />
          <Route path="/animals" element={<CarListPage />} />
          <Route path="/logout" element={<Logout />} />
        {/* </Route> */}
      </Routes>
      <Footer1 />
    </Router>
  );
}

export default App;
