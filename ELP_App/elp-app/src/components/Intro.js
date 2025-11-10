import React, { useState } from 'react';
import './Intro.css';
import Header from './Header';
import Helper from './Helper';
import { useNavigate } from 'react-router-dom';



const Intro = () => {
  var token = sessionStorage.getItem('token');
  var role = sessionStorage.getItem('role');
  var uname = sessionStorage.getItem('uname');
  var userid = sessionStorage.getItem('userid');
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [avail, setAvail] = useState('');

  const handleListAll = async (e) => {
    e.preventDefault();
    try {
      const equipmentDetails = {
        category: null,
        ename: null,
        availability: null,
        ecndtn: null
      };
      const data = await Helper.getEquipmentsData(token, equipmentDetails);
      navigate('/equipmentlist', { state: data });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent the page from reloading
    try {
      var availability = null;
      if (avail === 'yes') {
        availability = true;
      }
      else if (avail === 'no') {
        availability = false;
      }
      const equipmentDetails = {
        category: null,
        ename: query,
        availability: availability,
        ecndtn: null
      };
      const data = await Helper.getEquipmentsData(token, equipmentDetails);
      navigate('/equipmentlist', { state: data });
    } catch (error) {
      console.error('Error logging out:', error);
      setError('An error occurred. Please try again.');
    }
  };
  const onClicksports = async (e) => {
    e.preventDefault();
    onClickcard('sports');
  };
  const onClickmusic = async (e) => {
    e.preventDefault();
    onClickcard('Music');
  };
  const onClicklab = async (e) => {
    e.preventDefault();
    onClickcard('lab');
  };
  const onClickcameras = async (e) => {
    e.preventDefault();
    onClickcard('camera');
  };
  const onClickproject = async (e) => {
    e.preventDefault();
    onClickcard('project');
  };
  const onClickrequest = async (e) => {
    e.preventDefault();
    try {
      console.log('clicked on request');
      const data = await Helper.getRequestdata(token);
      const admindata = (role === 'admin') ? await Helper.getRequestdataforadmin(token) : [];
      navigate('/requestlist', { state: { data: data, admindata: admindata } });
    } catch (error) {
      console.error('Error logging out:', error);
      setError('An error occurred. Please try again.');
    }
  };
  const onClickcard = async (category) => {
    try {
      console.log('clicked on category ' + category);
      const equipmentDetails = {
        category: category,
        ename: null,
        availability: null,
        ecndtn: null
      };
      const data = await Helper.getEquipmentsData(token, equipmentDetails);
      navigate('/equipmentlist', { state: data });
    } catch (error) {
      console.error('Error logging out:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      {Header('EQUIPMENT LENDING PORTAL')}
      <div className='search-container'>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for equipments..."
            value={query}
            className="search-input"
            onChange={(e) => setQuery(e.target.value)} required
          />
          ‎ Availability: <select name="availability" id="availability" onChange={(e) => setAvail(e.target.value)} required>
            <option value="all">All</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>≔
          <br></br>
          <button type="submit" className="search-button">
            Search
          </button>
          <button className="search-button" onClick={handleListAll}>
            List All
          </button>
        </form>
      </div>
      <div>
        <h3 className='header'>Categories</h3>
      </div>
      <div className='categories'>
        <div className='categories-row'>
          <div className='category-card' onClick={onClicksports}>
            <div><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRvGMXpwr-YE24YqeTDf5tIIIsnKvVuzUUAw&s' alt='sports' className="card-image" /></div>
            <div><h4>SPORTS</h4></div>
          </div>
          <div className='category-card' onClick={onClickmusic}>
            <img src='https://thumbs.dreamstime.com/b/musical-instruments-icons-set-22251528.jpg' alt='musical instruments' className="card-image" />
            <h4>MUSICAL INSTRUMENTS</h4>
          </div>
          <div className='category-card' onClick={onClicklab}>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUBCOK24jzKUw7RDFS7OIowGotpte6RLtHlQ&s' alt='lab equipments' className="card-image" />
            <h4>LAB EQUIPMENTS</h4>
          </div>
        </div>
        <div className='categories-row'>
          <div className='category-card' onClick={onClickcameras}>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThbahNLsF4JwCwfv_dzM0HcgmIcfpyUVzOtQ&s' alt='cameras' className="card-image" />
            <h4>CAMERAS</h4>
          </div>
          <div className='category-card' onClick={onClickproject}>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnaxwNxwtOiztsl9N0iGxH2Q-QrwpSMkd9UA&s' alt='project kit' className="card-image" />
            <h4>PROJECT KITS</h4>
          </div>
          <div className='category-card' onClick={onClickrequest}>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyBDs1nT_DxBHB6vLLPLJrn2gjoQgJqe2n2g&s' alt='Requests' className="card-image" />
            <h4>Requests</h4>
          </div>
        </div>
      </div>
    </div>
  );



};

export default Intro;