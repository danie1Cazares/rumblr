
import { useState } from 'react';
// import styles from "./Profile.module.css";

import Wrapper from "../../components/Wrapper/Wrapper";
import Sidebar from '../../components/Sidebar/Sidebar';
import ProfilePanel from '../../components/ProfilePanel/ProfilePanel'
import CreatePostModal from '../../components/CreatePostModal/CreatePostModal';

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

const mockUser = {
  username: "cazaresdaniel0",
  fullName: "Daniel Cazares",
  avatar: "https://images.squarespace-cdn.com/content/v1/631ba8eed2196a6795698665/3690ca61-6a9d-4c93-a2a5-83a5f2aa1648/2022-08-16-Trinet-0540-Martinez-Juan.jpg",
  bio: "Frontend developer • Lifting heavy • Building cool things",
  following: [
    "dev_jess",
    "reactdaily",
    "ui.ux.inspo",
    "frontendmike",
    "designvault"
  ],
  followers: [
    "alex.codes",
    "fitcoder",
    "ux.nina",
    "jswizard",
    "pixel.pete",
    "webdev.sam"
  ]
};

const mockPosts = [
  {
    id: 1,
    author: {
      name: "Daniel C.",
      avatarUrl: "https://thelightcommittee.com/wp-content/uploads/elementor/thumbs/studio-business-headshot-of-a-black-man-in-Los-Angeles-r42uipeyz48g590yz1bhrtos4flfu3q2tuzohhy7f4.jpg"
    },
    contentImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    likes: 128,
    caption: "Beautiful day out here 😎🌤️",
    commentsCount: 12,
    daysOld: 1
  },
  {
    id: 2,
    author: {
      name: "Daniel C.",
      avatarUrl: "https://thelightcommittee.com/wp-content/uploads/elementor/thumbs/studio-business-headshot-of-a-black-man-in-Los-Angeles-r42uipeyz48g590yz1bhrtos4flfu3q2tuzohhy7f4.jpg"
    },
    contentImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
    likes: 342,
    caption: "Leg day never gets easier 💪🔥",
    commentsCount: 28,
    daysOld: 3
  },
  {
    id: 3,
    author: {
      name: "Daniel C.",
      avatarUrl: "https://thelightcommittee.com/wp-content/uploads/elementor/thumbs/studio-business-headshot-of-a-black-man-in-Los-Angeles-r42uipeyz48g590yz1bhrtos4flfu3q2tuzohhy7f4.jpg"
    },
    contentImage: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1200&auto=format&fit=crop",
    likes: 215,
    caption: "Late nights building things 🚀💻",
    commentsCount: 19,
    daysOld: 5
  },
  {
    id: 4,
    author: {
      name: "Daniel C.",
      avatarUrl: "https://thelightcommittee.com/wp-content/uploads/elementor/thumbs/studio-business-headshot-of-a-black-man-in-Los-Angeles-r42uipeyz48g590yz1bhrtos4flfu3q2tuzohhy7f4.jpg"
    },
    contentImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
    likes: 489,
    caption: "Sunsets hit different 🌅",
    commentsCount: 41,
    daysOld: 7
  },
  {
    id: 5,
    author: {
      name: "Daniel C.",
      avatarUrl: "https://thelightcommittee.com/wp-content/uploads/elementor/thumbs/studio-business-headshot-of-a-black-man-in-Los-Angeles-r42uipeyz48g590yz1bhrtos4flfu3q2tuzohhy7f4.jpg"
    },
    contentImage: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1200&auto=format&fit=crop",
    likes: 97,
    caption: "Keeping it simple.",
    commentsCount: 6,
    daysOld: 10
  }
];


  return (

    <Wrapper modifier="profile">

                        <Sidebar  sidebarIsCollapsed={false} onCreatePostClick={()=>{setShowCreatePost(true)}} />
                        <ProfilePanel user={mockUser} posts={mockPosts} onShowFollowersClick={()=>{setShowFollowers(true)}} onShowFollowingClick={()=>{setShowFollowing(true)}}/>
                        {showCreatePost && <CreatePostModal onExitClick={()=>{setShowCreatePost(false)}}/>}
                        {showFollowers && <ShowFollowersModal onExitClick={()=>{setShowFollowers(false)}}/>}
                        {showFollowing && <ShowFollowingModal onExitClick={()=>{setShowFollowing(false)}}/>}

        
    </Wrapper>   

  );
}
