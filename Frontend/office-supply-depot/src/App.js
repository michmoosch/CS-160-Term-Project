import logo from './logo.svg';
import './App.css';
const axios = require('axios');

function App() {
  
function register(id, pw, fname, lname, email){
    axios
    .get()
    .then(async resp => {
      return resp;
    });
  }
  
  // Insert format: userID, userPsw, firName, lstName, email


  const id = 1234;
  const pw = "password"
  const fName = "Michael"
  const lName = "Moore"
  const email = "test@hotmail.com"
  return (
    <div className="App">
      <div>User info: {`userID: ${id}, userPsw: ${pw}, firName: ${fName}, lstName: ${lName}, email: ${email}`}</div>
      <button onClick={register(id, pw, fName, lName, email)}>Test API Route</button>
    </div>
  );
}

export default App;
