import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { useEffect } from 'react'
import { Container } from "@mui/system";
import { ThemeProvider } from "@mui/system";
import theme from './Styles/theme';

function App() {

  useEffect(() => {
    document.title = "Office Depot Supply"
  })

  return (
    <ThemeProvider theme={theme}>

      <Container className="App" maxWidth="xl" sx={{background: '#fff'}}>
        {/* TODO: Figure out if I should combine the login/sign route with the home page route */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index path="/login" element={<Login />} />
            </Route>
            <Route path="signup" element={<Signup />} />
            <Route path="home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
