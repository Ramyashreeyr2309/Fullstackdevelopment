import React, { useEffect, useState } from 'react';
import './Intro.css';
import { useNavigate } from 'react-router-dom';

const Header = (title) => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [error, setError] = useState('');
    var token = sessionStorage.getItem('token');
    var uname = sessionStorage.getItem('uname');
    const onLogout = () => {
        sessionStorage.setItem('token', null);
        sessionStorage.setItem('role', null);
        sessionStorage.setItem('userid', null);
        sessionStorage.setItem('uname', null);
    };
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            console.log('started');
            const response = await fetch('http://localhost:4000/user/session/current?token=' + token, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                onLogout();
                navigate('/login'); // Redirect to login page upon successful logout
            } else {
                setError(response.status);
            }
        } catch (error) {
            console.error('Error logging out:', error);
            setError('An error occurred. Please try again.');
        }
    };

    useEffect(() => {
        if (token == null || token === 'null') {
            console.log('redirecting to login page');
            navigate('/login');
        }
    }, [token, navigate]
    );

    return (
        <div className="intro-page-heading">
            <div className="header">
                <h1>{title}</h1>
            </div>
            <div className="user-profile">
                <h4>👤</h4>
                <h5>{uname}</h5>
                <button onClick={handleLogout} >
                    Logout
                </button>
            </div>
        </div>
    );

}


export default Header;