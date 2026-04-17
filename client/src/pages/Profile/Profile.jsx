
import { useState, useEffect } from 'react';
// import styles from "./Profile.module.css";
import { useAuth } from "../../context/AuthContext";


import Wrapper from "../../components/Wrapper/Wrapper";
import Sidebar from '../../components/Sidebar/Sidebar';
import ProfilePanel from '../../components/ProfilePanel/ProfilePanel'
import CreatePostModal from '../../components/CreatePostModal/CreatePostModal';

import { useParams } from "react-router-dom";


import api from '../../api';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import ShowFollowersModal from '../../components/ShowFollowersModal/ShowFollowersModal';
import ShowFollowingModal from '../../components/ShowFollowingModal/ShowFollowingModal';


// export default function Profile({ user, posts }) {
export default function Profile() {

const [showCreatePost, setShowCreatePost] = useState(false);
const [showFollowers, setShowFollowers] = useState(false);
const [showFollowing, setShowFollowing] = useState(false);
const { userId } = useParams();
    const { user } = useAuth();


const [profileUser, setProfileUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log(userId);
        const res = await api.get(`/users/${userId}`);
        setProfileUser(res.data);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
    
  }, [userId]); // 🔥 important dependency
  // }, []); 

  if (!profileUser) return <p>Loading...</p>;

  return (

    <Wrapper modifier="profile">

                        <Sidebar  sidebarIsCollapsed={false} onCreatePostClick={()=>{setShowCreatePost(true)}} />
                        {/* <ProfilePanel user={mockUser} posts={mockPosts} onShowFollowersClick={()=>{setShowFollowers(true)}} onShowFollowingClick={()=>{setShowFollowing(true)}}/> */}
                        
                        {profileUser.id === user?.id 
                        
                          ? <ProfilePanel user={profileUser} posts={profileUser.posts} activeLoggedInUser={true} onShowFollowersClick={()=>{setShowFollowers(true)}} onShowFollowingClick={()=>{setShowFollowing(true)}}/>
                          : <ProfilePanel user={profileUser} posts={profileUser.posts} activeLoggedInUser={false}  onShowFollowersClick={()=>{setShowFollowers(true)}} onShowFollowingClick={()=>{setShowFollowing(true)}}/>
                          
                        }
                        
                        
                        {showCreatePost && <CreatePostModal onExitClick={()=>{setShowCreatePost(false)}}/>}
                        {showFollowers && <ShowFollowersModal profileUserId={profileUser.id}  onExitClick={()=>{setShowFollowers(false)}}/>}
                        {showFollowing && <ShowFollowingModal profileUserId={profileUser.id}  onExitClick={()=>{setShowFollowing(false)}}/>}

        
    </Wrapper>   

  );
}
