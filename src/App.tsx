import { Route, Routes } from "react-router-dom";
import "./App.css";
import { PersistLogin } from "./components/Authentication/PersistLogin";
import { RequireAuth } from "./components/Authentication/RequireAuth";
import { Container } from "./components/Container/Container"; //-
import { Home } from "./pages/Home/Home";
import { Landing } from "./pages/Landing/Landing";
import { Login } from "./pages/Login/Login";
import { NotFound } from "./pages/NotFound/NotFound";
import { Signup } from "./pages/Signup/Signup";

function App() {
  return (
    <main className="App">
      <Routes>
        {/* Public routes */}
        <Route index path="/welcome" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Private routes */}
        <Route element={<PersistLogin />}>
          <Route path="/" element={<RequireAuth component={Container} />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
