import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Monitoring from './pages/Monitoring';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/loginWeb" element={<Login />} />
        <Route path="/monitoring" element={<Monitoring />} />
      </Routes>
    </Router>
  );
};

export default App;
