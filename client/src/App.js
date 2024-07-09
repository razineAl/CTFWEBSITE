import Login from "./pages/Login";
import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom';
import './App.css'
import Home from "./pages/Home";
import AuthContext from "./helpers/AuthContext";
import { useState } from "react";
import Rankings from "./pages/Rankings";
import Admin from "./pages/Admin";
import UserProfile from "./pages/UserProfile";
import Challenges from "./pages/Challenges";

function App() {
  const [authState,setAuthState] = useState({username:'',status:false,accessToken:'',id:'',role:'user'});

  return (
    <div className="App">
      <AuthContext.Provider value={{authState,setAuthState}}>
        <Router>
          <Routes>
            <Route path="/" exact Component={Login}></Route>
            <Route path="/home" exact Component={Home}></Route>
            <Route path="/challenges" exact Component={Challenges}></Route>
            <Route path="/ranking" exact Component={Rankings}></Route>
            <Route path="/admin-panel" exact Component={Admin}></Route>
            <Route path="/profile/:id" exact Component={UserProfile}></Route>
            

          </Routes>
        </Router>
      </AuthContext.Provider>
      
    </div>
  );
}

export default App;
