import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./components/Register/RegisterPage";
import LandingPage from "./components/LandingPage/LandingPage";
import DashboardPage from "./components/Dashboard/DashboardPage";
import LoginPage from "./components/Login/loginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
