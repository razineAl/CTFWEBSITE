import { useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import AuthContext from '../helpers/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Sidebar from '../components/Sidebar';

function Admin() {
    const { authState, setAuthState } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const cookies = new Cookies();
    let navigate = useNavigate();
    const refreshToken = cookies.get('refreshToken');

    useEffect(() => {
        let isMounted = true;
        axios.get('http://localhost:3001/refresh', { headers: { refreshToken: refreshToken } })
            .then((res) => {
                if (isMounted) {
                    setAuthState({ username: res.data.username, status: true, accessToken: res.data.accessToken, id: res.data.id, role: res.data.role });
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.error(err);
                if (isMounted) {
                    setLoading(false);
                    navigate('/login');
                }
            });
        return () => {
            isMounted = false;
        };
    }, [refreshToken, setAuthState, navigate]);

    useEffect(() => {
        if (!loading && authState.role !== 'Admin') {
            navigate('/home');
        }
    }, [authState, loading, navigate]);

    if (loading) {
        return <div>Loading...</div>;
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
                        <form onSubmit="">
                            <label>Mail</label>
                            <input type='email'></input>
                            <label>Password</label>
                            <input type='password'></input>
                            <button type='submit'>Create</button>
                        </form>
                    </div>

                </div>
                <div className='admin-interface-section' id='admin-delete-user'>
                    <div className='admin-interface-section-title'>
                        Delete User
                    </div>
                    <div className='admin-interface-section-body'>
                        <form onSubmit="">
                            <label>Mail</label>
                            <input type='email'></input>
                            <label>Password</label>
                            <input type='password'></input>
                            <button type='submit'>Create</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Admin;