// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import Login from './components/Login';
import Intro from './components/Intro';
import Equipmentlist from './components/Equipmentlist';
import Requestlist from './components/Requestlist';

function App() {
  const handleLogin = (user) => {
    sessionStorage.setItem('token',user.token);
    sessionStorage.setItem('role',user.role);
    sessionStorage.setItem('userid',user.user_id);
    sessionStorage.setItem('uname',user.name);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/intro" element={<Intro/>} /> 
          <Route path="/equipmentlist" element={<Equipmentlist/>} /> 
          <Route path="/requestlist" element={<Requestlist/>} /> 
          {/* Add more routes for other pages if needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
