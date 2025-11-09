import React, { useEffect, useState } from 'react';
import './Eqpt.css';
import { useNavigate } from 'react-router-dom';

const Requestlist = () => {
    var token = sessionStorage.getItem('token');
      var role = sessionStorage.getItem('role');
      var uname = sessionStorage.getItem('uname');
      var userid = sessionStorage.getItem('userid');
      const navigate = useNavigate(); // Initialize useNavigate hook
      const [error, setError] = useState('');
      const [query, setQuery] = useState('');
    
      useEffect(() => {
        if (token == null) {
          console.log('redirecting to login page');
          navigate('/login');
        }
      }, [token, navigate]
      );
      return (
        <div>
            <div class="eqpt-page-heading">
                <div class="header">
                    <h2>REQUESTS LIST</h2>
                </div>
                <div class="user-profile">
                    <h4>👤</h4>
                    <h5>{uname}</h5>
                    {/* <button onClick={handleLogout} >
                        Logout
                    </button> */}
                </div>
            </div>
            
        </div>
        );



};

export default Requestlist;