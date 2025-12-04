
// ->  CREATE OTHER COMPONENTS FOR DASHBOARD AND COMPLETE VERY BASIC STYLING/LAYOUT


import { useState } from 'react';

import styles from "./Dashboard.module.css";
import Wrapper from "../../components/Wrapper/Wrapper";
import Container from "../../components/Container/Container";
import SidebarComponent from '../../components/Sidebar/SidebarComponent';
import FeedComponent from '../../components/FeedComponent/FeedComponent'
import SearchPanel from '../../components/SearchPanel/SearchPanelComponent';
import FollowerSuggestionsComponent from '../../components/FollowerSuggestionsComponent/FollowerSuggestionsComponent'

import api from '../../api';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


export default function Login() {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showSearchPanel, setShowSearchPanel] = useState(false);

  const handleSearchClick = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    setShowSearchPanel(!showSearchPanel);
  };

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
    // <div className="wrapper wrapper--login">
    //     <div className="container container--login">        
      <Wrapper modifier="dashboard">
        {/* <Container >            */}
                    <SidebarComponent  isCollapsed={isSidebarCollapsed}  onSearchClick={handleSearchClick} />
                    <SearchPanel isOpen={showSearchPanel} />

                    <FeedComponent />
                    {/* <FollowerSuggestionsComponent /> */}

      {/* </Container> */}
    </Wrapper>     
  );
}
