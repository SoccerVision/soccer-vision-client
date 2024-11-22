import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { UserProvider } from "./context/UserContext";
import { Home } from "./pages/Home/Home";
import { Landing } from "./pages/Landing/Landing";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/Signup/Signup";

function App() {
  return (
    <main className="App">
      <UserProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Private routes */}
          <Route path="/home" element={<Home />} />
        </Routes>
      </UserProvider>
    </main>
  );
}

export default App;
