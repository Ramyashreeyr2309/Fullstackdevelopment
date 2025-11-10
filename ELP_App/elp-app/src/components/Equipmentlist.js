import React, { useEffect, useState } from 'react';
import './Eqpt.css';
import Header from './Header';
import { useNavigate, useLocation } from 'react-router-dom';

const Equipmentlist = () => {
    var token = sessionStorage.getItem('token');
    var role = sessionStorage.getItem('role');
    var uname = sessionStorage.getItem('uname');
    var userid = sessionStorage.getItem('userid');
    const navigate = useNavigate(); // Initialize useNavigate hook
    const location = useLocation();
    const data = location.state;

    const handleAdd = async () => {
        try {
            console.log('started');
            navigate('/equipment/details'); // Redirect to login page upon successful logout
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleReq = async (eqid) => {
        try {
            console.log('started' + eqid);
            // navigate('/equipments/details'); // Redirect to login page upon successful logout
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleEdit = async (equipment) => {
        try {
            var state = {
                type: 'Update',
                equipment: equipment
            }
            console.log('started' + equipment);
            navigate('/equipment/details', { state: data }); 
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    const handleDelete = async (eqid) => {
        try {
            console.log('started' + eqid);
            // navigate('/equipments/details'); // Redirect to login page upon successful logout
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const manageComponent = (equipment) => {
        if (role === 'admin') {
            return (<><div className='eqbutton'>
                {<button onClick={() => handleEdit(equipment)}>
                    EDIT
                </button>}
            </div><div className='eqbutton'>
                    {<button onClick={() => handleDelete(equipment.eqid)}>
                        DELETE
                    </button>}
                </div></>);
        }
        return ('');
    };

    const manageComponent2 = () => {
        if (role === 'admin') {
            return (<><div className='eqbutton'>
                {<button onClick={() => handleAdd()}>
                    ADD EQUIPMENT
                </button>}
            </div>
            </>);
        }
        return ('');
    };

    return (
        <div>
            {Header('EQUIPMENT LIST')}
            <div>
                {/* Map through your data to render the list */}
                {data.map((item, index) => (
                    <div key={index}>
                        <div>
                            {manageComponent2()}
                            </div>
                        <div className='category-eqcard'>
                            <div className='header'><h6>{item.ename}</h6></div>
                            <div className='eqbutton'>
                                {<button onClick={() => handleReq(item.eqid)} >
                                    REQUEST
                                </button>}
                            </div>
                            {manageComponent(item)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );




};

export default Equipmentlist;