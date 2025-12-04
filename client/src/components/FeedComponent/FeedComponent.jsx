// Home
// Search
// Messages
// Notifications ?
// Create (post)
// Profile
// Settings

// Repurpose for rumblr Login, basic styling only

import { useState } from 'react';
import styles from "./FeedComponent.module.css";
import Wrapper from "../Wrapper/Wrapper";
import Container from "../Container/Container";
import PostComponent from "../Post/PostComponent"
import FollowerSuggestionsComponent from '../../components/FollowerSuggestionsComponent/FollowerSuggestionsComponent'

import api from '../../api';
// import photo from '../../../'
import { NavLink, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


export default function FeedComponent() {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [message, setMessage] = useState('');
  const navigate = useNavigate();

  //Mock posts to simulate data from DB
 const mockPosts = [
  {
    id: 1,
    author: {
      name: "Daniel C.",
      avatarUrl: "https://thelightcommittee.com/wp-content/uploads/elementor/thumbs/studio-business-headshot-of-a-black-man-in-Los-Angeles-r42uipeyz48g590yz1bhrtos4flfu3q2tuzohhy7f4.jpg"
    },
    contentImage: "https://s.yimg.com/ny/api/res/1.2/SZ4.K5NkuTI30Yy3bhWDQQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyNDI7aD04MjY7Y2Y9d2VicA--/https://media.zenfs.com/en/travel.travelleisure.com/fb8d168ea18a4fb2d4eaa6a55dad64eb",
    likes: 128,
    caption: "Beautiful day out here 😎🌤️",
    commentsCount: 12,
    daysOld: 1,
  },
  {
    id: 2,
    author: {
      name: "Emily Zhang",
      avatarUrl: "https://media.istockphoto.com/id/1394347360/photo/confident-young-black-businesswoman-standing-at-a-window-in-an-office-alone.jpg?s=612x612&w=0&k=20&c=tOFptpFTIaBZ8LjQ1NiPrjKXku9AtERuWHOElfBMBvY="
    },
    contentImage: "https://www.theladders.com/wp-content/uploads/cooking-190916-1490x838.jpg",
    likes: 452,
    caption: "Trying a new recipe today 👩‍🍳🔥",
    commentsCount: 34,
    daysOld: 3,
  },
  {
    id: 3,
    author: {
      name: "Mike Johnson",
      avatarUrl: "https://t3.ftcdn.net/jpg/07/91/92/84/360_F_791928460_PAyk5vjaVasAgMFBLGOko4uRf2OS24S6.jpg"
    },
    contentImage: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg",
    likes: 87,
    caption: "Late-night coding session… again 🧠💻",
    commentsCount: 5,
    daysOld: 0,
  },
  {
    id: 4,
    author: {
      name: "Ava Martinez",
      avatarUrl: "https://media.istockphoto.com/id/1560360283/photo/confident-smiling-young-asian-business-woman-in-office-headshot-portrait.jpg?s=612x612&w=0&k=20&c=UapN0uldJoSvKe_RVsdRyXBHtru5BuT9dR-7NCPrRCI="
    },
    contentImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOhhDt9trKX7JFTXkJB88ZukeClX98PM-fRg&s",
    likes: 1020,
    caption: "Sunsets never get old 🌅💛",
    commentsCount: 89,
    daysOld: 5,
  },
    {
    id: 5,
    author: {
      name: "Sophia Reed",
      avatarUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=200&q=80"
    },
    contentImage: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
    likes: 305,
    caption: "New camera day 📸 Testing out the low-light performance!",
    commentsCount: 18,
    daysOld: 2,
  },
  {
    id: 6,
    author: {
      name: "Jordan Miles",
      avatarUrl: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=80"
    },
    contentImage: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80",
    likes: 782,
    caption: "Finally hit the summit today 🏔️🔥 Feeling unstoppable.",
    commentsCount: 47,
    daysOld: 4,
  }
];



  return (
     
    <Container modifier="feed">
      <Container modifier="feed__posts">           
          <PostComponent 
              authorAvatar="https://images.squarespace-cdn.com/content/v1/631ba8eed2196a6795698665/3690ca61-6a9d-4c93-a2a5-83a5f2aa1648/2022-08-16-Trinet-0540-Martinez-Juan.jpg"
              authorName="Mr. Rumblr"
              daysOld="2"
              contentImage="https://foundersbeta.com/wp-content/uploads/2024/09/Startup-Memes-Paying-Customer.png"
              likeCount="4,392 likes"
              caption="Beautiful day outside."
              commentsCount="120"
              onLike={() => console.log("Liked")}
              onComment={() => console.log("Comment")}
              onShare={() => console.log("Share")}
              onSave={() => console.log("Saved")}
          />        

          {mockPosts.map(post => (
              <PostComponent
              key={post.id}
              authorName={post.author.name}
              authorAvatar={post.author.avatarUrl}
              contentImage={post.contentImage}
              likeCount={post.likes}
              caption={post.caption}
              commentsCount={post.commentsCount}
              daysOld={post.daysOld}
              />
          ))}
      </Container>

      <FollowerSuggestionsComponent />

    </Container>

  );
}


// CREATE SEARCH COMPONENT, SIDEBAR SHOULD MINIMIZE TO JUST ICONS ON CLICK AND SEARCH COMPONENT SHOULD SLIDE IN / EXPAND OUT.