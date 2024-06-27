import Login from "./pages/Login";
import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom';
import './App.css'
import Home from "./pages/Home";
import AuthContext from "./helpers/AuthContext";
import { useState } from "react";

function App() {
  const [authState,setAuthState] = useState({username:'',status:false,accessToken:'',id:''});

  return (
    <div className="App">
      <AuthContext.Provider value={{authState,setAuthState}}>
        <Router>
          <Routes>
            <Route path="/" exact Component={Login}></Route>
            <Route path="/home" exact Component={Home}></Route>

          </Routes>
        </Router>
      </AuthContext.Provider>
      
    </div>
  );
}

export default App;
