import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard'
import Messages from './pages/Messages/Messages';
import Profile from './pages/Profile/Profile';
import Settings from './pages/Settings/Settings';
// import Messages from './components/Messages';
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Test from './components/Test';

function App() {
  return (

    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/messages" element={<Messages />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/test" element={<Test />} />
          {/* <Route path="*" element={<Profile />} /> */}

        </Routes>
      </Router>
    </AuthProvider>

  );
}

export default App;
