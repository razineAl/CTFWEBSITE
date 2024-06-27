import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import AuthContext from '../helpers/AuthContext';
import { Link, Router,Routes,Route, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Rankings from './Rankings';


function Home(){
    const [challenges,setChallenges] = useState([]);
    const {authState,setAuthState} = useContext(AuthContext);
    const cookies = new Cookies();
    let navigate = useNavigate();
    
    useEffect(()=>{
        const refreshToken = cookies.get('refreshToken');
        axios.get('http://localhost:3001/refresh',{headers:{refreshToken:refreshToken}})
        .then((res)=>{
            setAuthState({...authState,accessToken:res.data.accessToken});
            axios.get('http://localhost:3001/challenge/all',{headers:{accessToken:res.data.accessToken}})
            .then((response)=>{
                setChallenges(response.data);   
                console.log(res.data.accessToken);
            })    
        })
        
    },[])
    

    return(
        <div id='home'>
            <Router>
            <nav id="home-navbar">
                <Link className='link'>Challenges</Link>
                <Link className='link'>Rankings</Link>
                <Link className='link'>More</Link>
                <Link className='link'>Settings</Link>
            </nav>
            <Routes>
                <Route path='/home' exact Component={Home}></Route>
                <Route path='/rankings' exact Component={Rankings}></Route>
                <Route path='/' exact Component={Rankings}></Route>
                <Route path='/' exact Component={Rankings}></Route>
            </Routes>

            </Router>
            
            <div id='challenges'>
            {challenges.map((challenge,index)=>{
                return(
                    <div className='challenge-container' key={index}>
                        <div className='challenge-header'><p>{challenge.category}</p><span className={`bg-color${challenge.difficulty}`}>{challenge.difficulty}</span></div>
                        <div className={`challenge-body color${challenge.difficulty}`}>{challenge.title}</div>
                        <div className='challenge-footer'>{challenge.points} points</div>
                    </div>
                )
            })}
            </div>
        
        </div>
    );
}

export default Home;