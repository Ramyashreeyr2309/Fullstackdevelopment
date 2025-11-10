import React, { useEffect, useState } from 'react';
import './DialogBox.css';
import { useNavigate } from 'react-router-dom';


const DialogBox = ({status, content}) => {
    const navigate = useNavigate();
    const handleGoHome = () => {
        navigate('/intro');
    };

    return (
        <div class="overlay">
            <dialog id="myDialog" open>
                <h3>{status}</h3>
                <p>{content}</p>
                <button onClick={handleGoHome}>Home</button>
            </dialog>
        </div>
    );
};


export default DialogBox;