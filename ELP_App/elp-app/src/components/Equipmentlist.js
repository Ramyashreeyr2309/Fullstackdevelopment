import React, { useEffect, useState } from 'react';
import './Eqpt.css';
import Header from './Header';
import DialogBox from './DialogBox';
import { useNavigate, useLocation } from 'react-router-dom';

const Equipmentlist = () => {
    var token = sessionStorage.getItem('token');
    var role = sessionStorage.getItem('role');
    var uname = sessionStorage.getItem('uname');
    var userid = sessionStorage.getItem('userid');
    const navigate = useNavigate(); // Initialize useNavigate hook
    const location = useLocation();
    const data = location.state;
    const showData = data.length != 0;
    const [showDialog, setShowDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState({ status: '', content: '' });

    const setDbox = (status, content) => {
        setDialogContent({
            status: status,
            content: content
        });
        setShowDialog(true);
    };

    const handleAdd = async () => {
        try {
            var state = {
                type: 'Insert',
                equipment: {}
            }
            console.log('started');
            navigate('/equipment/details', { state: state }); // Redirect to login page upon successful logout
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleReq = async (eqid) => {
        try {
            console.log(eqid)
            const body = {
                eqid: eqid
            }
            const response = await fetch('http://localhost:4000/requests/?token=' + token, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            if (response.ok) {
                setDbox("Success :)", "Request has been created successfully");
            } else {
                setDbox("Failed :(", "Error creating request");
            }
        } catch (error) {
            console.error('Error creating request:', error);
            setDbox("Failed :(", "Error creating request");
        }
    };

    const handleEdit = async (equipment) => {
        try {
            var state = {
                type: 'Update',
                equipment: equipment
            }
            console.log('started' + equipment);
            navigate('/equipment/details', { state: state });
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };


    const handleDelete = async (eqid) => {
        try {
            console.log(eqid)
            const response = await fetch('http://localhost:4000/equipments/' + eqid + '?token=' + token, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                setDbox("Success :)", "Equipment has been deleted successfully");
            } else {
                setDbox("Failed :(", "Error deleting equipment");
            }
        } catch (error) {
            console.error('Error deleting equipment:', error);
            setDbox("Failed :(", "Error deleting equipment");
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
                <div>
                    {manageComponent2()}
                </div>
                <div>{showDialog && (
                    <DialogBox
                        status={dialogContent.status}
                        content={dialogContent.content}
                    />
                )}</div>
                {!showData && (<div>
                <h2>No Equipments.. Please check with Admin</h2>
            </div>)}
                {/* Map through your data to render the list */}
                {data.map((item, index) => (
                    <div key={index}>
                        <div className='category-eqcard'>
                            <div className='header'><h3>{item.ename} ({item.category})</h3></div>
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