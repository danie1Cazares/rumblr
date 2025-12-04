// Home
// Search
// Messages
// Notifications ?
// Create (post)
// Profile
// Settings

// Repurpose for rumblr Login, basic styling only

import { useState } from 'react';
import styles from "./Sidebar.module.css";
import Wrapper from "../../components/Wrapper/Wrapper";
import Container from "../../components/Container/Container";
import api from '../../api';
// import photo from '../../../'
import { NavLink, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


export default function SidebarComponent({ isCollapsed, onSearchClick }) {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [message, setMessage] = useState('');
  const navigate = useNavigate();


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

  return (
    // <div className="wrapper wrapper--login">
    //     <div className="container container--login">        
        <Container modifier="sidebar">           
        {/* <Container modifier={
         isCollapsed
           ? "sidebar--collapsed"
           : "sidebar"
         }>            */}
                    

{/* // Home
// Search
// Messages
// Notifications ?
// Create (post)
// Profile
// Settings */}

        {/* <div className={styles.nav}> */}
        <div className={isCollapsed
           ? styles["nav--collapsed"]
           : styles.nav}>


            <div className={styles["nav__group"]}>
                <div className={styles.logo}>RumblR Logo</div>

                <div className={styles["nav__element"]}>
                    <div className={styles["element__icon"]}>ICON</div>
                    {!isCollapsed && <div className={styles["element__link"]}>Home</div>}
                </div>
                <div className={styles["nav__element"]}>
                    <div className={styles["element__icon"]} onClick={onSearchClick}>S_ICON</div>
                    {!isCollapsed && <div className={styles["element__link"]} onClick={onSearchClick}>Search</div>}
                </div>
                <div className={styles["nav__element"]}>
                    <div className={styles["element__icon"]}>ICON</div>
                    {!isCollapsed && <div className={styles["element__link"]}>Messages</div>}
                </div>
                <div className={styles["nav__element"]}>
                    <div className={styles["element__icon"]}>ICON</div>
                    {!isCollapsed && <div className={styles["element__link"]}>Notifications</div>}
                </div>
                <div className={styles["nav__element"]}>
                    <div className={styles["element__icon"]}>ICON</div>
                    {!isCollapsed && <div className={styles["element__link"]}>Create</div>}
                </div>
            </div>


            <div className={styles["nav__group"]}>
                <div className={styles["nav__element"]}>
                    <div className={styles["element__icon"]}>ICON</div>
                   {!isCollapsed && <div className={styles["element__link"]}>Profile</div>}
                </div>
                <div className={styles["nav__element"]}>
                    <div className={styles["element__icon"]}>ICON</div>
                    {!isCollapsed && <div className={styles["element__link"]}> Settings</div>}
                </div>
            </div>

        </div>

      </Container>
  );
}
