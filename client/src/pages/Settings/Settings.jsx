

import react from 'react';

// import styles from "./Settings.module.css";
import Wrapper from "../../components/Wrapper/Wrapper";
import Sidebar from '../../components/Sidebar/Sidebar';
import CreatePostModal from '../../components/CreatePostModal/CreatePostModal';
import SettingsPanel from '../../components/SettingsPanel/SettingsPanel'
import api from '../../api';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


export default function Settings() {

  const navigate = useNavigate();
  const [showCreatePost, setShowCreatePost] = react.useState(false);


  return (
    
    <Wrapper modifier="settings">
                    <Sidebar  sidebarIsCollapsed={false} onCreatePostClick={()=>{setShowCreatePost(true)}}/>
                    <SettingsPanel />

                    {showCreatePost && <CreatePostModal onExitClick={()=>{setShowCreatePost(false)}}/>}


    </Wrapper>     
  );
}
