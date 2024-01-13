import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Users from "./components/Users";
import POS from "./components/POS";
import Inv_Products from "./components/Inv_Products";
import Inv_Sales from "./components/Inv_Sales";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if success value is stored in session
    const storedSuccess = sessionStorage.getItem("success");
    if (storedSuccess) {
      setLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    // Store success value in session
    sessionStorage.setItem("success", true);
  };
  return (
    <div className="wrapper" value={isLoggedIn}>
      <div
        id="loader"
        className="preloader flex-column justify-content-center align-items-center"
      >
        <img
          className="animation__wobble"
          src="dist/img/AdminLTELogo.png"
          alt="AdminLTELogo"
          height={60}
          width={60}
        />
      </div>
      {/* <Router>
        <Routes>
          <Route
            path="/Login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/Layout" element={<Layout />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Quantity" element={<Quantity />} />
          <Route path="/POS" element={<POS />} />
          <Route path="/Inv_Products" element={<Inv_Products />} />
          <Route path="/Inv_Sales" element={<Inv_Sales />} />
        </Routes>
      </Router> */}
      <Routes>
        <Route
          path="/"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route element={<RequireAuth />}>
          <Route path="/Layout" element={<Layout />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/POS" element={<POS />} />
          <Route path="/Inv_Products" element={<Inv_Products />} />
          <Route path="/Inv_Sales" element={<Inv_Sales />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
