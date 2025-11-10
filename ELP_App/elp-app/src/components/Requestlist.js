import React, { useEffect, useState } from 'react';
import './Eqpt.css';
import Header from './Header';
import DialogBox from './DialogBox';
import { useNavigate, useLocation } from 'react-router-dom';

const Requestlist = () => {
    var token = sessionStorage.getItem('token');
    var role = sessionStorage.getItem('role');
    var uname = sessionStorage.getItem('uname');
    var userid = sessionStorage.getItem('userid');
    const location = useLocation();
    const data = location.state.data;
    const admindata = location.state.admindata;
    const showData = data.length != 0;
    const showAdmindata = admindata.length != 0;
    const [showDialog, setShowDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState({ status: '', content: '' });
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [error, setError] = useState('');

    const setDbox = (status, content) => {
        setDialogContent({
            status: status,
            content: content
        });
        setShowDialog(true);
    };
    const handleReturn = async (rqid) => {
        try {
            const response = await fetch('http://localhost:4000/requests/' + rqid + '/return?token=' + token, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                setDbox('Success :)', "Returned successfully");
            } else {
                setDbox("Failed :(", "Error updating request");
            }
        } catch (error) {
            console.error('Error updating request:', error);
            setDbox("Failed :(", "Error updating request");
        }
    };

    const handleApproveReject = async (rqid, approval_status) => {
        try {
            const body = {
                approval_status: approval_status
            }
            const response = await fetch('http://localhost:4000/requests/' + rqid + '/approval?token=' + token, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            if (approval_status === "approved") {
                if (response.ok) {
                    setDbox('Success :)', "Request has been approved successfully");
                } else {
                    setDbox("Failed :(", "Error updating request");
                }
            } else {
                if (response.ok) {
                    setDbox('Success :)', "Request has been rejected");
                } else {
                    setDbox("Failed :(", "Error updating request");
                }
            }
        } catch (error) {
            console.error('Error updating request:', error);
            setDbox("Failed :(", "Error updating request");
        }
    };

    const manageComponent = (request) => {
        if (role === 'admin') {
            return (<><div className='eqbutton'>
                {request.approval_status === 'pending' && <button onClick={() => handleApproveReject(request.rqid, "approved")}>
                    Approve
                </button>}
            </div><div className='eqbutton'>
                    {request.approval_status === 'pending' && <button onClick={() => handleApproveReject(request.rqid, "reject")}>
                        Reject
                    </button>}
                </div>
                <div className='eqbutton'>
                    {request.approval_status === 'approved' && <button onClick={() => handleReturn(request.rqid)}>
                        Return
                    </button>}
                </div></>);
        }
        return ('');
    };


    console.log(data);
    console.log(admindata);
    return (
        <div>
            <div>{Header('REQUESTS LIST')}</div>
            <div>{showDialog && (
                <DialogBox
                    status={dialogContent.status}
                    content={dialogContent.content}
                />
            )}</div>
            {!showData && !showAdmindata && (<div>
                <h2>No Requests..</h2>
            </div>)}
            {showData && (<div>
                <h2>Your Requests</h2>
            </div>)}
            {data.map((item, index) => (
                <div key={index}>
                    <div className='category-rqcard'>
                        <div className='header'><h6>{item.rqid}</h6></div>
                        <div className='header'><h6>{item.ename}</h6></div>
                        <div className='header'><h6>{item.approval_status}</h6></div>
                        <div className='header'><h6>{item.return_status}</h6></div>
                        <div className='header'><h6>{item.approver}</h6></div>
                        <div>
                        </div>
                    </div>
                </div>
            ))}
            {showAdmindata && (<div>
                <h2>Requests for review</h2>
            </div>)}
            {admindata.map((item, index) => (
                <div key={index}>
                    <div className='category-rqcard'>
                        <div className='header'><h6>{item.rqid}</h6></div>
                        <div className='header'><h6>{item.ename}</h6></div>
                        <div className='header'><h6>{item.approval_status}</h6></div>
                        <div className='header'><h6>{item.return_status}</h6></div>
                        <div className='header'><h6>{item.requestor}</h6></div>
                        {manageComponent(item)}
                    </div>
                </div>
            ))}
        </div>

    );
};

export default Requestlist;