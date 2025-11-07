// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import Login from './components/Login';
import Intro from './components/Intro';

function App() {
  const [token, setToken] = useState(null);
  const handleLogin = (token) => {
    setToken(token);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/intro" element={<Intro token={token}/>} /> 
          {/* Add more routes for other pages if needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
