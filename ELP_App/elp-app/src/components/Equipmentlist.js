import React, { useEffect, useState } from 'react';
import './Eqpt.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Equipmentlist = () => {
    var token = sessionStorage.getItem('token');
    var role = sessionStorage.getItem('role');
    var uname = sessionStorage.getItem('uname');
    var userid = sessionStorage.getItem('userid');
    const navigate = useNavigate(); // Initialize useNavigate hook
    const location = useLocation();
    const data = location.state;

    useEffect(() => {
        if (token == null) {
            console.log('redirecting to login page');
            navigate('/login');
        }
    }, [token, navigate]
    );

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            console.log('started');
            navigate('/login'); // Redirect to login page upon successful logout
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleReq = async (e) => {
        e.preventDefault();
        try {
            console.log('started');
            navigate('/equipments/details'); // Redirect to login page upon successful logout
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            console.log('started');
            navigate('/equipments/details'); // Redirect to login page upon successful logout
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            console.log('started');
            navigate('/equipments/details'); // Redirect to login page upon successful logout
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div>
            <div class="eqpt-page-heading">
                <div class="header">
                    <h2>EQUIPMENT LIST</h2>
                </div>
                <div class="user-profile">
                    <h4>👤</h4>
                    <h5>{uname}</h5>
                    {/* <button onClick={handleLogout} >
                        Logout
                    </button> */}
                </div>
            </div>
            <div class="user-profile">
                {<button onClick={handleAdd} >
                    ADD EQUIPMENT
                </button>}
            </div>
            <div>
                {/* Map through your data to render the list */}
                {data.map(item => (
                    <div key={item.id}>
                        <div className='category-card'>
                            <div className='header'><h6>{item.ename}</h6></div>
                            <div className='eqbutton'>
                                {<button onClick={handleReq} >
                                    REQUEST
                                </button>}
                            </div>
                            <div className='eqbutton'>
                                {<button onClick={handleEdit} >
                                    EDIT
                                </button>}
                            </div>
                            <div className='eqbutton'>
                                {<button onClick={handleDelete} >
                                    DELETE
                                </button>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );




};

export default Equipmentlist;