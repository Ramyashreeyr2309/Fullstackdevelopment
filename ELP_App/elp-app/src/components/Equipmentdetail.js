import React, { useEffect, useState } from 'react';
import './Eqpt.css';
import Header from './Header';
import { useNavigate, useLocation } from 'react-router-dom';


const Equipmentdetail = () => {
        const location = useLocation();
    const data = location.state;

    return (
        <div>{Header('EQUIPMENT DETAILS')}</div>
    );
}
export default Equipmentdetail;