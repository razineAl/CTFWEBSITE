import {useContext, useEffect, useState,useRef} from 'react';
import axios from 'axios';
import AuthContext from '../helpers/AuthContext';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import BarLoader from 'react-spinners/BarLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGear, faRightFromBracket, faUser} from '@fortawesome/free-solid-svg-icons';

import Footer from '../components/Footer';
import BarChart from '../components/BarChart';
import Navbar from '../components/Navbar';
import { url } from '../App';


function UserProfile(){
    const [user,setUser] = useState({});
    const [solvedByCat,setSolvedByCat] = useState({});
    const [solvedByDiff,setSolvedByDiff] = useState({});
    const {authState,setAuthState} = useContext(AuthContext);
    const [loading,setLoading] = useState(true);
    const [navOptions,setNavOptions] = useState(false);
    const [difficulty,setDifficulty] = useState(false);

    const optionsRef = useRef(null);





    const override = {
        display: "block",
        position:"absolute",
        top:"50%",
        left:"50%",
        transform:"translate(-50%,-50%)"
    };

    let navigate = useNavigate();
    let {id} = useParams();


    useEffect(()=>{

        axios.get(`${url}:${process.env.PORT}/refresh`,{ withCredentials: true})
        .then((res)=>{
            if (res.data.error) return navigate('/');
            setAuthState({username:res.data.username,status:true,accessToken:res.data.accessToken,id:res.data.id,role:res.data.role});
            axios.get(`${url}:${process.env.PORT}/users/byId/${id}`,{withCredentials:true,headers:{'Authorization':`Bearer ${res.data.accessToken}`}})
            .then((response)=>{
                setUser(response.data); 
            }) 
            axios.get(`${url}:${process.env.PORT}/challenge/solved/category/${id}`,{withCredentials:true,headers:{'Authorization':`Bearer ${res.data.accessToken}`}})
            .then((response)=>{
                setSolvedByCat(response.data.categories); 
                setSolvedByDiff(response.data.difficulties); 
                setLoading(false);
            }) 
        })    

        
        
        
    },[id])
    

    const date = new Date(user.creationDate);

    const Months = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];


    const chartData1 = {
        labels: ['General','Web', 'Forensics', 'Reverse Eng', 'Cracking'],
        values: [solvedByCat.General || 0, solvedByCat['Web Exploitation'] || 0, solvedByCat.Forensics || 0, solvedByCat['Reverse Eng'] || 0, solvedByCat.Cracking || 0]
    };
    const chartData2 = {
        labels: ['level 1', 'level 2', 'level 3', 'level 4', 'level 5'],
        values: [solvedByDiff[1] || 0, solvedByDiff[2] || 0, solvedByDiff[3] || 0, solvedByDiff[4] || 0, solvedByDiff[5] || 0]
    };




    const changeStats = ()=>{
        setDifficulty(!difficulty);
    }

    return(
        <div id='user-profile-page'>

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
            <div id='user-profile-general-section'>
            <div id='user-profile-general-section-titles'>
                <div><p>Username</p></div>
                <div><p>Points</p></div>
                <div><p>Ranking</p></div>
                <div><p>Solved Challenges</p></div>
                <div><p>Member since</p></div>
            </div>
            <div id='user-profile-general-section-information'>
                <div><p>{user.username}</p></div>
                <div><p>{user.points}</p></div>
                <div><p>{user.ranking}</p></div>
                <div><p>{user.challenges ? user.challenges.length : 0}</p></div>
                <div><p>{Months[date.getMonth()]+' '+ date.getFullYear()}</p></div>
            </div>
            </div>
            <div id='user-profile-informations-section'>
                <div id='stats-filter'><button type='click' onClick={changeStats}>Solves by {difficulty ? 'category' : 'difficulty'} <span>&#9660;</span></button></div>
                
                <div style={{ backgroundColor: '#FFF' }} className='chart-container'>
                    <BarChart data={difficulty ? chartData2 : chartData1} />
                </div>
            </div>
            <Footer></Footer>
            
                    </>
                )
            }


            
            
        
        </div>
    )
}

export default UserProfile;