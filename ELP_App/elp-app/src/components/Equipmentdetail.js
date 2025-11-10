import React, { useEffect, useState } from 'react';
import './Eqpt.css';
import Header from './Header';
import DialogBox from './DialogBox';
import { useNavigate, useLocation } from 'react-router-dom';


const Equipmentdetail = () => {
    var token = sessionStorage.getItem('token');
    const location = useLocation();
    const navigate = useNavigate(); // Initialize useNavigate hook
    const data = location.state;
    var userid = sessionStorage.getItem('userid');
    const [error, setError] = useState('');
    const [type, setType] = useState(data.type);
    const [eqid, setEqid] = useState(data.equipment.eqid);
    const [ename, setEname] = useState(data.equipment.ename);
    const [ecndtn, setEcndtn] = useState(data.equipment.ecndtn);
    const [quantity, setQuantity] = useState(data.equipment.quantity);
    const [category, setCategory] = useState(data.equipment.category);
    const [showDialog, setShowDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState({ status: '', content: '' });

    const setDbox = (status, content) => {
        setDialogContent({
            status: status,
            content: content
        });
        setShowDialog(true);
    };

    const handleInsert = async (e) => {
        e.preventDefault();
        try {
            const body = {
                ename: ename,
                category: category,
                ecndtn: ecndtn,
                quantity: quantity
            }
            console.log(ecndtn)
            const response = await fetch('http://localhost:4000/equipments?token=' + token, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            if (response.ok) {
                setDbox("Success :)", "Equipment has been added successfully");
            } else {
                setDbox("Failed :(", "Error adding equipment");
            }
        } catch (error) {
            console.error('Error adding equipment:', error);
            setDbox("Failed :(", "Error adding equipment");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const body = {
                ename: ename,
                category: category,
                ecndtn: ecndtn,
                new_quantity: quantity,
                old_quantity: data.equipment.quantity
            }
            const response = await fetch('http://localhost:4000/equipments/' + eqid + '?token=' + token, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            if (response.ok) {
                setDbox('Success :)', "Equipment has been updated successfully");
            } else {
                setDbox("Failed :(", "Error updating equipment");
            }
        } catch (error) {
            console.error('Error updating equipment:', error);
            setDbox("Failed :(", "Error updating equipment");
        }
    };

    const handleSubmit = (type === 'Insert') ? handleInsert : handleUpdate;

    return (
        <div>
            <div>{Header('EQUIPMENT DETAILS')}</div>
            <div>{showDialog && (
                <DialogBox
                    status={dialogContent.status}
                    content={dialogContent.content}
                />
            )}</div>
            <form className="equipment-form" onSubmit={handleSubmit}>
                <div>
                    <h2>Equipment {type} </h2>
                </div>
                <div>
                    <label htmlFor="ename">Equipment Name : </label>
                    <input type="ename" id="ename" value={ename} onChange={(e) => setEname(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="category">Equipment Category : </label>
                    <select name="category" id="category" value={(category == null) ? "" : category} onChange={(e) => setCategory(e.target.value)} required>
                        <option value="" disabled>Select category</option>
                        <option value="sports">sports</option>
                        <option value="Music">Music</option>
                        <option value="lab">lab</option>
                        <option value="camera">camera</option>
                        <option value="project">project</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="ecndtn">Equipment Condition : </label>
                    <select name="ecndtn" id="ecndtn" value={(ecndtn == null) ? "" : ecndtn} onChange={(e) => setEcndtn(e.target.value)} required>
                        <option value="" disabled>Select condition</option>
                        <option value="good">good</option>
                        <option value="fair">fair</option>
                        <option value="bad">bad</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="quantity">Quantity : </label>
                    <input type="number" id="quantity" min="0" max="100" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
export default Equipmentdetail;