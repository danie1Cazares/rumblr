

import { useState } from 'react';
import styles from "./FollowerSuggestions.module.css";
import Container from "../Container/Container";

import { NavLink, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import ListUser from '../ListUser/ListUser';


export default function FollowerSuggestionsComponent() {

  const navigate = useNavigate();

  const mockUser = {avatar: 'https://thelightcommittee.com/wp-content/uploads/elementor/thumbs/studio-business-headshot-of-a-black-man-in-Los-Angeles-r42uipeyz48g590yz1bhrtos4flfu3q2tuzohhy7f4.jpg', username: 'cazaresdaniel', name: 'Daniel Cazares',};

 const mockFollowSuggestions = [
  {
    avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=200&q=80",
    username: "sophia.reed",
    fullName: "Sophia Reed"
  },
  {
    avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=80",
    username: "jordan_miles",
    fullName: "Jordan Miles"
  },
  {
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    username: "emily.chen",
    fullName: "Emily Chen"
  },
  {
    avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=200&q=80",
    username: "mason_ryder",
    fullName: "Mason Ryder"
  },
  {
    avatar: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=200&q=80",
    username: "nina.ramos",
    fullName: "Nina Ramos"
  },
  {
    avatar: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=200&q=80",
    username: "devin_crews",
    fullName: "Devin Crews"
  }
];



  return (
      
    <Container modifier="suggestions">        

              <div className={styles["active-profile"]}>
                <div className={styles["active-profile__author-avatar"]}>
                  <img
                    className={styles["active-profile__avatar-image"]}
                    src={mockUser.avatar}
                    alt={`${mockUser.username} avatar`}
                  />
                </div>
        
                <div className={styles["active-profile__details"]}>
                        <div className={styles["active-profile__username"]}> {mockUser.username} </div>
                        <div className={styles["active-profile__name"]}> {mockUser.name} </div>

                </div>

                <div className={styles["active-profile__switch-user"]} >Switch</div>

              </div>

              <div className={styles["suggested-header"]}>Suggested for you</div>


            {mockFollowSuggestions.map(suggestion => (
                  <div className={styles["follow-suggestion"]}>
                      <div className={styles["follow-suggestion__author-avatar"]}>
                        <img
                            className={styles["follow-suggestion__avatar-image"]}
                            src={suggestion.avatar}
                            alt={`${suggestion.username} avatar`}
                        />
                      </div>
            
                      <div className={styles["follow-suggestion__details"]}>
                              <div className={styles["follow-suggestion__username"]}> {suggestion.username} </div>
                              <div className={styles["follow-suggestion__name"]}> {suggestion.fullName} </div>

                      </div>

                    <div className={styles["follow-suggestion__follow-user"]} >Follow</div>

                  </div>
            ))}

            {/* {mockFollowSuggestions.map(user => (

               <ListUser avatar={user.avatar} name={user.fullName} username={user.username} actionElement={
                  <div className={styles["follow-suggestion__follow-user"]} >Follow</div>
                } />

            ))} */}

            <div className={styles.footer}>
                <div className={styles["footer__links"]}>About . Help . Press . API . Jobs . Privacy . Consumer Health Privacy . Terms . Locations . Language . Meta Verified</div>
                <div className={styles["footer__copyright"]}>© 2025 RUMBLR</div>
            </div>


                
    

    </Container>
  );
}
