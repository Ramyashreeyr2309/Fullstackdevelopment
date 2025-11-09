import React, { useEffect, useState } from 'react';
import './Intro.css';
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

  useEffect(() => {
    if (token == null) {
      console.log('redirecting to login page');
      navigate('/login');
    }
  }, [token, navigate]
  );

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

  const handleListAll = async (e) => {
    e.preventDefault();
    try {
      const equipmentDetails = {
        category: null,
        ename: null,
        availability: null,
        ecndtn: null
      };
      const data = await RedirectEquipmentPage(token, equipmentDetails);
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
      const data = await RedirectEquipmentPage(token, equipmentDetails);
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
    console.log('clicked on request');
    navigate('/requestlist');
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
      const data = await RedirectEquipmentPage(token, equipmentDetails);
      navigate('/equipmentlist', { state: data });
    } catch (error) {
      console.error('Error logging out:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>

      <div class="intro-page-heading">
        <div class="header">
          <h1>EQUIPMENT LENDING PORTAL</h1>
        </div>
        <div class="user-profile">
          <h4>👤</h4>
          <h5>{uname}</h5>
          <button onClick={handleLogout} >
            Logout
          </button>
        </div>

      </div>
      <div className='search-container'>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for equipments..."
            value={query}
            className="search-input"
            onChange={(e) => setQuery(e.target.value)} required
          />
          Availability:<select name="availability" id="availability" onChange={(e) => setAvail(e.target.value)} required>
            <option value="all">All</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <br></br>
          <button type="submit" className="search-button">
            Search
          </button>
          <div onClick={handleListAll}>
            <button className="search-button">
              List All
            </button>
          </div>
        </form>
      </div>
      {/* <div>
        <h3>Categories</h3>
      </div> */}
      <div className='categories'>
        <div className='categories-row'>
          <div className='category-card' onClick={onClicksports}>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRvGMXpwr-YE24YqeTDf5tIIIsnKvVuzUUAw&s' alt='sports' className="card-image" />
            <h3>SPORTS</h3>
          </div>
          <div className='category-card' onClick={onClickmusic}>
            <img src='https://thumbs.dreamstime.com/b/musical-instruments-icons-set-22251528.jpg' alt='musical instruments' className="card-image" />
            <h3>MUSICAL INSTRUMENTS</h3>
          </div>
          <div className='category-card' onClick={onClicklab}>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUBCOK24jzKUw7RDFS7OIowGotpte6RLtHlQ&s' alt='lab equipments' className="card-image" />
            <h3>LAB EQUIPMENTS</h3>
          </div>
        </div>
        <div className='categories-row'>
          <div className='category-card' onClick={onClickcameras}>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThbahNLsF4JwCwfv_dzM0HcgmIcfpyUVzOtQ&s' alt='cameras' className="card-image" />
            <h3>CAMERAS</h3>
          </div>
          <div className='category-card' onClick={onClickproject}>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnaxwNxwtOiztsl9N0iGxH2Q-QrwpSMkd9UA&s' alt='project kit' className="card-image" />
            <h3>PROJECT KITS</h3>
          </div>
          <div className='category-card' onClick={onClickrequest}>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyBDs1nT_DxBHB6vLLPLJrn2gjoQgJqe2n2g&s' alt='Requests' className="card-image" />
            <h3>requests</h3>
          </div>
        </div>
      </div>
    </div>
  );



};

const RedirectEquipmentPage = async (token, equipmentDetails) => {
  try {
    console.log('started');
    const response = await fetch('http://localhost:4000/equipments/details?token=' + token, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(equipmentDetails)
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Error getting equipment list');
    }
  } catch (error) {
    console.error('Error getting equipment list:', error);
    throw error;
  }
}

export default Intro;