import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Login from "./pages/Login.jsx";

const RootComponent = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setIsAuth={setIsAuth} />} />
          <Route
            path="/app"
            element={isAuth ? <App /> : <Navigate to="/app" />}
          />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<RootComponent />);
