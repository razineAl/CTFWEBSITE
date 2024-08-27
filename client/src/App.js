import Login from "./pages/Login";
import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom';
import 'normalize.css'
import './App.css'
import Home from "./pages/Home";
import AuthContext from "./helpers/AuthContext";
import { useState } from "react";
import Rankings from "./pages/Rankings";
import Admin from "./pages/Admin";
import UserProfile from "./pages/UserProfile";
import Challenges from "./pages/Challenges";
import ChallengePage from "./pages/ChallengePage";
import Premium from "./pages/Premium";
import FAQ from "./pages/FAQ";
import Registration from "./pages/Registration";
import Settings from "./pages/Settings";

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
            <Route path="/billing" exact Component={Premium}></Route>
            <Route path="/admin-panel" exact Component={Admin}></Route>
            <Route path="/profile/:id" exact Component={UserProfile}></Route>
            <Route path="/challenge/:id" exact Component={ChallengePage}></Route>
            <Route path="/faq" exact Component={FAQ}></Route>
            <Route path="/registration" exact Component={Registration}></Route>
            <Route path="/account/settings/:id" exact Component={Settings}></Route>
            

          </Routes>
        </Router>
      </AuthContext.Provider>
      
    </div>
  );
}

export default App;
