

import { useState } from 'react';

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
  



  const handleSubmit = async (e) => {
  e.preventDefault();
  // try {
  //   const res = await api.post('/auth/login', form);

  //   // Success
  //   if (res.data.token) {
  //     localStorage.setItem('token', res.data.token);
  //     navigate('/profile');
  //   }
  // } catch (err) {
  //   // Error (like 401 from backend)
  //   if (err.response && err.response.data.message) {
  //     setMessage(err.response.data.message);
  //   } else {
  //     setMessage('Something went wrong, please try again.');
  //   }
  // }
};

  // CHECK LOGIN STATUS AND RETURN TO PROFILE PAGE IF LOGGED IN
  // if (localStorage.getItem('token')) return <Navigate to="/profile" />;


  return (     
      <Wrapper modifier="dashboard">
                    <Sidebar  sidebarIsCollapsed={false} onCreatePostClick={()=>{setShowCreatePost(true)}}/>
                    <FeedPanel />
                    {showCreatePost && <CreatePostModal onExitClick={()=>{setShowCreatePost(false)}}/>}

      </Wrapper>     
  );
}
