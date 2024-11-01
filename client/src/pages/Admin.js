import { useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import AuthContext from '../helpers/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function Admin() {
    const { authState, setAuthState } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [username1,setUsername1] = useState('');
    const [password1,setPassword1] = useState('');
    const [username2,setUsername2] = useState('');
    const [password2,setPassword2] = useState('');
    const [focus,setFocus] = useState(false); 
    const [focused,setFocused] = useState(false); 

    
   
    let navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/refresh',{ withCredentials: true})
            .then((res) => {
                if (res.data.error) return navigate('/');
                setAuthState({ username: res.data.username, status: true, accessToken: res.data.accessToken, id: res.data.id, role: res.data.role });
                setLoading(false);
                
            })
            .catch((err) => {
                console.error(err);
            });
    }, [setAuthState, navigate]);

    

    const handleFocus = ()=>{
        setFocus(true);

    }
    const handleFocused = ()=>{
        setFocused(true);

    }

    const handleBlur = ()=>{
        if (username1==='') {
            setFocus(false);
        }

    }
    const handleBlured = ()=>{
        if (password1==='') {
            setFocused(false);
        }         
    }
    const handleUserCreation = async ()=>{
        try {
            const response = await axios.post('http://localhost:3001/auth/register',{username:username1,password:password1});
            console.log(response);

        } catch (error) {
            console.log(error);
        }
        

        
    }

    return (
        <div id='admin-page'>
            <Sidebar>
                <div className='admin-sidebar-sections active'>User Management</div>
                <div className='admin-sidebar-sections'>Challenge Management</div>
                <div className='admin-sidebar-sections'>Submissions and Scoring</div>
                <div className='admin-sidebar-sections'>Event Management</div>
                <div className='admin-sidebar-sections'>Security</div>
                <div className='admin-sidebar-sections'>Interface and Usability</div>
                <div className='admin-sidebar-sections'>Backup and Restore</div>
            </Sidebar>
            <div id='admin-interface'>
                <div className='admin-interface-section' id='admin-create-user'>
                    <div className='admin-interface-section-title'>
                        Create User
                    </div>
                    <div className='admin-interface-section-body'>
                        <form onSubmit={handleUserCreation}>
                            <div>
                                <label className={focus ? 'focused' : ''}>Username</label>
                                <input type='text' className={focus ? 'focused' : ''} value={username1} onChange={(e)=>{setUsername1(e.target.value)}} onFocus={handleFocus} onBlur={handleBlur}></input>
                            </div>
                            <div>
                                <label className={focused ? 'focused' : ''}>Password</label>
                                <input type='password' className={focused ? 'focused' : ''} value={password1} onChange={(e)=>{setPassword1(e.target.value)}} onFocus={handleFocused} onBlur={handleBlured}></input>
                            </div>                           
                            <button type='submit' className='btn bg-blue'>Create</button>
                        </form>
                    </div>

                </div>
                <div className='admin-interface-section' id='admin-delete-user'>
                    <div className='admin-interface-section-title'>
                        Delete User             {/*change        ---------      -----------    font*/}
                    </div>
                    <div className='admin-interface-section-body'>
                        <form >
                            <div>
                                <label>Username</label>
                                <input type='text' value={username2} onChange={(e)=>{setUsername2(e.target.value)}}></input>
                            </div>
                            <div>
                                <label>Password</label>
                                <input type='password' value={password2} onChange={(e)=>{setPassword2(e.target.value)}}></input>
                            </div> 
                            <button type='submit' className='bg-red'>Delete</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Admin;