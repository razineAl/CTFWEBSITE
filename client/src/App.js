import Login from "./pages/Login";
import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom';
import './App.css'
import Home from "./pages/Home";
import AuthContext from "./helpers/AuthContext";
import { useState } from "react";
import Rankings from "./pages/Rankings";
import Admin from "./pages/Admin";

function App() {
  const [authState,setAuthState] = useState({username:'',status:false,accessToken:'',id:''});

  return (
    <div className="App">
      <AuthContext.Provider value={{authState,setAuthState}}>
        <Router>
          <Routes>
            <Route path="/" exact Component={Login}></Route>
            <Route path="/home" exact Component={Home}></Route>
            <Route path="/ranking" exact Component={Rankings}></Route>
            <Route path="/admin-panel" exact Component={Admin}></Route>
            

          </Routes>
        </Router>
      </AuthContext.Provider>
      
    </div>
  );
}

export default App;
