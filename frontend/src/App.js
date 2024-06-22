import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AppNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import DataTable from "./components/DataTable";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

const clientId =
  "1003848437245-qvtphb5ic5tvdll1hiiet0if2u17kje4.apps.googleusercontent.com";

const AppContent = ({
  isLoggedIn,
  handleLogout,
  handleLoginSuccess,
  userName,
  userPicture,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoutAndRedirect = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <>
      <AppNavbar
        isLoggedIn={isLoggedIn && location.pathname === "/data"}
        onLogout={handleLogoutAndRedirect}
        userName={userName}
        userPicture={userPicture}
      />
      <Routes>
        <Route
          path="/"
          element={<LoginForm onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/data" element={<DataTable />} />
      </Routes>
      <Footer />
    </>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPicture, setUserPicture] = useState("");

  const handleLoginSuccess = (profile) => {
    setIsLoggedIn(true);
    setUserName(profile.given_name);
    setUserPicture(profile.picture);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    setUserPicture("");
    // Optionally, clear any user data stored in local state or localStorage
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <AppContent
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          handleLoginSuccess={handleLoginSuccess}
          userName={userName}
          userPicture={userPicture}
        />
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
