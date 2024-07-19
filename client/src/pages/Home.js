import {useContext, useEffect, useState, useCallback, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import AuthContext from '../helpers/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Typed from 'typed.js';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ArrowRight from '../components/ArrowRight';
import ArrowLeft from '../components/ArrowLeft';
import DifficultySpan from '../components/DifficultySpan';
import ScaleLoader from "react-spinners/ScaleLoader";



function Home(){
    const {authState,setAuthState} = useContext(AuthContext);
    const [loading,setLoading] = useState(true);
    const [newChallenges,setNewChallenges] = useState([]);

    const typedRef = useRef(null);

    
    const override = {
        display: "block",
        position:"absolute",
        top:"50%",
        left:"50%",
        transform:"translate(-50%,-50%)"
    };

    const cookies = new Cookies();
    
    let navigate = useNavigate();
    
    useEffect(()=>{
        const refreshToken = cookies.get('refreshToken');
        axios.get('http://localhost:3001/refresh',{headers:{refreshToken:refreshToken}})
        .then((res)=>{
            setAuthState({username:res.data.username,status:true,accessToken:res.data.accessToken,id:res.data.id,role:res.data.role});
            axios.get('http://localhost:3001/challenge/newest/6',{headers:{accessToken:res.data.accessToken}})
            .then((response)=>{
                setNewChallenges(response.data); 
                setLoading(false);
            })    
        })
        
    },[])
    
    useEffect(() => {

        if (typedRef.current) {
            const options = {
                strings: [
                  'Welcome to Elmore CTF',
                  'Where all the cybersecurity enthusiasts meet',
                  'Learn by solving challenges of various categories',
                  'Both server-side and client-side web security challenges',
                  'Forensics, Cryptography, Reverse Engineering and much more !'
                ],
                typeSpeed: 40,
                backSpeed: 25,
                backDelay: 1000,  
                loop: true,
              };
              const typed = new Typed(typedRef.current, options);
    
              return () => {
                  typed.destroy();
              };
        }

              
    }, []);

       
    const settings = {
        dots: false,
        infinite: false,
        speed: 650,
        slidesToShow: 3,
        slidesToScroll: 2,
        nextArrow:<ArrowRight/>,
        prevArrow:<ArrowLeft/>

    };
    const getTime = (time) => {

        let creationTime = new Date(time).getTime();
        let actualTime = new Date().getTime();
        let result = actualTime - creationTime;

        const seconds = Math.floor(result / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
    
    return(
        
        
        <div id='home'>
            {
            loading ?
            (
                <ScaleLoader
                    color="#000"
                    loading={loading}
                    cssOverride={override}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            )
            :
            (
                <>
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
                    <Link className='link' to={`../profile/${authState.id}`}>{authState.username+" "}<FontAwesomeIcon icon={faUser} /></Link>
                </div>
            </nav>
            <div id='main-typing-container'>
                <span><h2 className='typed-text' ref={typedRef}></h2></span>
            </div>
            <div id='home-main-content' className='slider-container'>
                    <h2 className='new-challenge-heading'>Our latest challenges</h2>
                    <Slider {...settings}>
                        {newChallenges.map((challenge,index)=>{
                            return(
                                <div key={index} className='new-challenge'>
                                    <div className='new-challenge-content'>
                                        <div className='new-challenge-first-half'>
                                            {challenge.title}
                                        </div>
                                        <div className='new-challenge-second-half'>
                                            <div className={`new-challenge-category color${challenge.difficulty}`}>{challenge.category}</div>
                                            <div className={`new-challenge-creation-text`}>created { getTime(challenge.creationDate)}</div>
                                            <DifficultySpan difficulty={challenge.difficulty}></DifficultySpan>
                                        </div>
                                    </div>
                                    
                                </div>
                            )

                        })}
                    </Slider>
                  
            </div>
                </>
            )
            

            }
        </div>

    );
}

export default Home;