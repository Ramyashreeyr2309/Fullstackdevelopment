// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Intro from './components/Intro';
import Equipmentlist from './components/Equipmentlist';
import Requestlist from './components/Requestlist';
import Equipmentdetail from './components/Equipmentdetail';

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
          {/* Root redirect to login to give a clear default entrypoint */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/intro" element={<Intro/>} /> 
          <Route path="/equipmentlist" element={<Equipmentlist/>} /> 
          <Route path="/requestlist" element={<Requestlist/>} />
          {/* Use an id param for equipment details so components can load by id: /equipment/123 */}
          <Route path="/equipment/:id" element={<Equipmentdetail/>} />
          {/* Add more routes for other pages if needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
