import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}>
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="signup" element={<Signup />} />
          <Route path="home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
