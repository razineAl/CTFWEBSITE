import {useContext, useEffect, useState,useRef} from 'react';
import axios from 'axios';
import AuthContext from '../helpers/AuthContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGear, faRightFromBracket, faUser} from '@fortawesome/free-solid-svg-icons';
import BarLoader from 'react-spinners/BarLoader';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';


function Rankings(){
    const [topUsers,setTopUsers] = useState([]);
    const [topThree,setTopThree] = useState([]);
    const [topRest,setTopRest] = useState([]);
    const {authState,setAuthState} = useContext(AuthContext);
    const [more,setMore] = useState(false);

    const [loading,setLoading] = useState(true);
    const [navOptions,setNavOptions] = useState(false);
    const optionsRef = useRef(null);


    let navigate = useNavigate();


    useEffect(()=>{

        axios.get('http://localhost:3001/refresh',{ withCredentials: true})
        .then((res)=>{
            if (res.data.error) return navigate('/');
            setAuthState({username:res.data.username,status:true,accessToken:res.data.accessToken,id:res.data.id,role:res.data.role});
            axios.get('http://localhost:3001/users/top/10',{withCredentials:true,headers:{'Authorization':`Bearer ${res.data.accessToken}`}})
            .then((response)=>{
                setTopUsers(response.data);  
                setTopThree(response.data.slice(0,3));
                setTopRest(response.data.slice(3));
                setLoading(false);
            })    
        })
        
    
        
    },[])

    
    const showMore = async()=>{
        if (!more) {
            setMore(true);
            axios.get('http://localhost:3001/users/top/50',{withCredentials:true,headers:{'Authorization':`Bearer ${authState.accessToken}`}})
            .then((response)=>{
                setTopUsers(response.data);  
                setTopThree(response.data.slice(0,3));
                setTopRest(response.data.slice(3));
            })
        } else {
            setMore(false);
            axios.get('http://localhost:3001/users/top/10',{withCredentials:true,headers:{'Authorization':`Bearer ${authState.accessToken}`}})
            .then((response)=>{
                setTopUsers(response.data);  
                setTopThree(response.data.slice(0,3));
                setTopRest(response.data.slice(3));
            })
        }
        
    }
    const override = {
        display: "block",
        position:"absolute",
        top:"50%",
        left:"50%",
        transform:"translate(-50%,-50%)"
    };

    return(
        <div id='ranking-page'>
            {
                loading ?
                (
                    <BarLoader
                    color="#000046"
                    loading={loading}
                    cssOverride={override}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    />
                )
                :
                (
                    <>
                <Navbar></Navbar>
            <div id='ranking-tab'>
                <div id='top-three-container'>
                    <div>
                        <div className='top-three-position'><p>1</p></div>
                        <div className='top-three-username'><Link className='ranking-link' to={`../profile/${topThree[0]._id}`}>{topThree[0].username}</Link></div>
                        <div className='top-three-challenges'><p>{topThree[0].challenges.length} challenges</p></div>
                        <div className='top-three-points'><p>{topThree[0].points} points</p></div>
                    </div>
                    <div>
                        <div className='top-three-position'><p>2</p></div>
                        <div className='top-three-username'><Link className='ranking-link' to={`../profile/${topThree[1]._id}`}>{topThree[1].username}</Link></div>
                        <div className='top-three-challenges'><p>{topThree[1].challenges.length} challenges</p></div>
                        <div className='top-three-points'><p>{topThree[1].points} points</p></div>
                    </div>
                    <div>
                        <div className='top-three-position'><p>3</p></div>
                        <div className='top-three-username'><Link className='ranking-link' to={`../profile/${topThree[2]._id}`}>{topThree[2].username}</Link></div>
                        <div className='top-three-challenges'><p>{topThree[2].challenges.length} challenges</p></div>
                        <div className='top-three-points'><p>{topThree[2].points} points</p></div>
                    </div>
                    
                </div>
                <div id='top-rest-container'>
                                <div className='top-rest'>
                                    <div><p>Position</p></div>
                                    <div><p>User</p></div>
                                    <div><p>Points</p></div>
                                    <div><p>Challenges</p></div>
                                </div>
                    {
                        topRest.map((top,index)=>{
                            return(
                                <div key={index} className={index%2==0 ? 'odd top-rest' : 'even top-rest' }>
                                    <div><p>{index+4}</p></div>
                                    <div><Link className='ranking-link' to={`../profile/${top._id}`}>{top.username}</Link></div>
                                    <div><p>{top.points}</p></div>
                                    <div><p>{top.challenges.length}</p></div>
                                </div>
                            )
                        })
                    }
                </div>
                <p onClick={showMore} className='ranking-link'>See {more ? 'Less' : 'More'}</p>
            </div>
            <Footer></Footer>
            </>
            )
            }
            
        
        </div>
    )
}

export default Rankings;