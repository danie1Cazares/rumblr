

import { useState, useEffect } from 'react';
import { useAuth } from "../../context/AuthContext";

// import styles from "./Dashboard.module.css";
import Wrapper from "../../components/Wrapper/Wrapper";
import Container from "../../components/Container/Container";
import Sidebar from '../../components/Sidebar/Sidebar';
import FeedPanel from '../../components/FeedPanel/FeedPanel'
import CreatePostModal from '../../components/CreatePostModal/CreatePostModal';

import api from '../../api';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';



export default function Dashboard() {

  const navigate = useNavigate();
  const [showCreatePost, setShowCreatePost] = useState(false);

    // const { user, setUser } = useAuth();


  // if (!user) return <p>Loading...</p>;

  // CHECK LOGIN STATUS AND RETURN TO LOGIN PAGE IF NOT LOGGED IN
    // if (!(localStorage.getItem('token'))) return <Navigate to="/" />;



  return (     
      <Wrapper modifier="dashboard">
                    <Sidebar  sidebarIsCollapsed={false} onCreatePostClick={()=>{setShowCreatePost(true)}}/>
                    <FeedPanel  />
                    {showCreatePost && <CreatePostModal onExitClick={()=>{setShowCreatePost(false)}}/>}

      </Wrapper>     
  );
}


// import ProtectedRoute from "./ProtectedRoute";
// import Dashboard from "./Dashboard";

// <Route
//   path="/dashboard"
//   element={
//     <ProtectedRoute>
//       <Dashboard />
//     </ProtectedRoute>
//   }
// />

// import { useAuth } from "./context/AuthContext";

// function Dashboard() {
//   const { user } = useAuth();

//   return (
//     <div>
//       <h1>Welcome {user.fname}</h1>
//     </div>
//   );
// }