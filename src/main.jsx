import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Login from "./pages/Login.jsx";

const RootComponent = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isAuth ? <App /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<RootComponent />);
