import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
// import Register from './components/Register';
// import Profile from './components/Profile';
// import Messages from './components/Messages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="*" element={<Profile />} /> */}

      </Routes>
    </Router>
  );
}

export default App;
