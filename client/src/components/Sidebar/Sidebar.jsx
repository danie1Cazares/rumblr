
import { useState } from 'react';
import styles from "./Sidebar.module.css";
import Container from "../Container/Container";
import api from '../../api';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import SearchPanel from '../../components/SearchPanel/SearchPanel';
import NotificationsPanel from '../../components/NotificationsPanel/NotificationsPanel';


export default function SidebarComponent({ sidebarIsCollapsed, onCreatePostClick, preventNavExpansion=false }) {
// 
  const navigate = useNavigate();

    const [isNavCollapsed, setIsNavCollapsed] = useState(preventNavExpansion);
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);

  const onSearchClick = () => {



     if (!showNotificationsPanel && preventNavExpansion === false) setIsNavCollapsed(!isNavCollapsed);

    setShowNotificationsPanel(false); // hide notifications panel
    setShowSearchPanel(!showSearchPanel);

  };

    const onNotificationsClick = () => {

      if (!showSearchPanel  && preventNavExpansion === false) setIsNavCollapsed(!isNavCollapsed);
    
    setShowNotificationsPanel(!showNotificationsPanel);
    setShowSearchPanel(false); // hide search panel

  };


  return (          
         <Container modifier={
         sidebarIsCollapsed
           ? "sidebar-collapsed"
           : "sidebar"
         }>            
              

        <div className={isNavCollapsed
           ? styles["nav--collapsed"]
           : styles.nav}>


            <div className={styles["nav__group"]}>
                <NavLink to="/dashboard"><img className={styles.logo} src="rumblr_logo_1_small.png" alt="RumblR logo" /></NavLink>
                <div className={styles["nav__element"]}>
                <div><NavLink to="/dashboard"><span className={`material-symbols-outlined ${styles["element__icon"]}`}>home</span></NavLink></div>
                    {!isNavCollapsed && <div className={styles["element__link"]}><NavLink to="/dashboard">Home</NavLink></div>}
                </div>
                <div className={styles["nav__element"]}>
                    <div onClick={onSearchClick}><span className={`material-symbols-outlined ${styles["element__icon"]}`}>search</span></div>
                    {!isNavCollapsed && <div className={styles["element__link"]} onClick={onSearchClick}>Search</div>}
                </div>
                <div className={styles["nav__element"]}>
                    <div><NavLink to="/messages"><span className={`material-symbols-outlined ${styles["element__icon"]}`}>mode_comment</span></NavLink></div>
                    {!isNavCollapsed && <div className={styles["element__link"]}><NavLink to="/messages">Messages</NavLink></div>}
                </div>
                <div className={styles["nav__element"]}>
                    <div onClick={onNotificationsClick}><span className={`material-symbols-outlined ${styles["element__icon"]}`}>notifications</span></div>
                    {!isNavCollapsed && <div className={styles["element__link"]} onClick={onNotificationsClick} >Notifications</div>}
                </div>
                <div className={styles["nav__element"]}>
                    <div onClick={onCreatePostClick}><span className={`material-symbols-outlined ${styles["element__icon"]}`}>add_2</span></div>
                    {!isNavCollapsed && <div className={styles["element__link"]} onClick={onCreatePostClick}>Create</div>}
                </div>
            </div>


            <div className={styles["nav__group"]}>
                <div className={styles["nav__element"]}>
                    <div className={styles["element__icon"]}><NavLink to="/profile"><span class="material-symbols-outlined">account_circle</span></NavLink></div>
                   {!isNavCollapsed && <div className={styles["element__link"]}><NavLink to="/profile">Profile</NavLink></div>}
                </div>
                <div className={styles["nav__element"]}>
                    <div className={styles["element__icon"]}><NavLink to="/settings"><span class="material-symbols-outlined">settings</span></NavLink></div>
                    {!isNavCollapsed && <div className={styles["element__link"]}><NavLink to="/settings">Settings</NavLink></div>}
                </div>
            </div>

        </div>

        <SearchPanel isOpen={showSearchPanel} />
        <NotificationsPanel isOpen={showNotificationsPanel} />

      </Container>
  );
}
