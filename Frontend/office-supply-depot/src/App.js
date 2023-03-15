import logo from './logo.svg';
import './App.css';
import Login from "./components/Login"
import Signup from './components/Signup'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
//const axios = require('axios');

function App() {
  
 
  
  // Insert format: userID, userPsw, firName, lstName, email


  const id = 1234;
  const pw = "password"
  const fName = "Michael"
  const lName = "Moore"
  const email = "test@hotmail.com"
  return (
    <div className="App">
      {/* <Login/> */}
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}>
          <Route path="login" element={<Login />} />        
        </Route>
        <Route path="signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
      {/* <Signup/> */}
      {/* <div>User info: {`userID: ${id}, userPsw: ${pw}, firName: ${fName}, lstName: ${lName}, email: ${email}`}</div>
      <button onClick={register(id, pw, fName, lName, email)}>Test API Route</button> */}
    </div>
  );
}

export default App;
