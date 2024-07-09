import {useContext, useEffect, useState, useCallback, useRef} from 'react';
import axios from 'axios';
import AuthContext from '../helpers/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Typed from 'typed.js';


function Home(){
    const {authState,setAuthState} = useContext(AuthContext);
    const [challenges,setChallenges] = useState([]);
    const [effChallenges,setEffChallenges] = useState([]);
    const [trace_challenge,setTrace_challenge] = useState({category:'All',difficulty:'All'});
    const [visible,setVisible] = useState(false);
    const [filtered,setFiltered] = useState(false);
    const [chosen,setChosen] = useState({});

    const individualChallenge = useRef(null);


    const cookies = new Cookies();
    
    let navigate = useNavigate();
    
    useEffect(()=>{
        const refreshToken = cookies.get('refreshToken');
        axios.get('http://localhost:3001/refresh',{headers:{refreshToken:refreshToken}})
        .then((res)=>{
            setAuthState({username:res.data.username,status:true,accessToken:res.data.accessToken,id:res.data.id,role:res.data.role});
            axios.get('http://localhost:3001/challenge/all',{headers:{accessToken:res.data.accessToken}})
            .then((response)=>{
                setChallenges(response.data);
                setEffChallenges(response.data);   
            })    
        })
        
    },[])
    useEffect(() => {
        const options = {
          strings: ['Welcome to Elmore CTF', 'Where all cybersecurity enthusiasts meet'],
          typeSpeed: 30,
          backSpeed: 15,
          loop: true,
        };
    
        const typed = new Typed('.typed-text', options);
    
        return () => {
            typed.destroy();
          };
      }, []);

    
    return(
        <div id='home' onClick=''>
            <nav className="home-navbar">
                <div className="navbar-part">
                    <div className='navbar-section'>
                        <Link className='link' to='/home'>Home</Link>
                    </div>
                    <div className='navbar-section'>
                        <Link className='link' to='/challenges'>Challenges</Link>
                    </div>
                    <div className='navbar-section'>
                        <Link className='link' to='/ranking'>Rankings</Link>
                    </div>
                    <div className='navbar-section'>
                        <Link className='link'>Premium</Link>
                    </div>
                    <div className='navbar-section'>
                        <Link className='link'>FAQ</Link>
                    </div>
                </div>
                <div className='navbar-part'>
                    <Link className='link' to={`../profile/${authState.id}`}>{authState.username+" >"}</Link>
                </div>
            </nav>
            <div id='main-carousel-container'>
                <span><h2 className='typed-text'></h2></span>
            </div>
        
        </div>
    );
}

export default Home;