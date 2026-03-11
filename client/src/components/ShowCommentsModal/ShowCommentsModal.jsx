


import { useState } from 'react';
import styles from "./ShowCommentsModal.module.css";
import Container from "../Container/Container";
import Post from '../Post/Post';
import api from '../../api';


export default function showComments({onExitClick}){

    const mockComments = [
      {
        id: "c1",
        author: "jessica.dev",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        text: "This looks amazing 🔥",
        createdAt: "2h",
        likes: 3
      },
      {
        id: "c2",
        author: "mark.codes",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        text: "Clean UI, very Instagram-like 👏",
        createdAt: "4h",
        likes: 1
      },
      {
        id: "c3",
        author: "ui.ninja",
        avatar: "https://randomuser.me/api/portraits/men/85.jpg",
        text: "How did you handle the grid sizing?",
        createdAt: "6h",
        likes: 0
      },
      {
        id: "c4",
        author: "sara.designs",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        text: "Love the spacing and typography 😍",
        createdAt: "1d",
        likes: 5
      },
      {
        id: "c5",
        author: "frontend.joe",
        avatar: "https://randomuser.me/api/portraits/men/12.jpg",
        text: "This would pair nicely with skeleton loaders.",
        createdAt: "1d",
        likes: 2
      },
      {
        id: "c6",
        author: "react.queen",
        avatar: "https://randomuser.me/api/portraits/women/21.jpg",
        text: "Nice use of BEM + CSS modules 💯",
        createdAt: "2d",
        likes: 4
      }
    ];
    
    
    return (
        

        <Container modifier={"show-comments"}>  

            <div className={styles["show-comments-modal__exit"]} onClick={onExitClick}>+</div>

            <div className={styles["show-comments-modal"]}>
                <img className={styles["show-comments-modal__img"]} src="https://foundersbeta.com/wp-content/uploads/2024/09/Startup-Memes-Paying-Customer.png" alt="" />
                <Post 
                    displayCommentsView = {true}
                    className={styles["show-comments-modal__post"]}
                    authorAvatar="https://images.squarespace-cdn.com/content/v1/631ba8eed2196a6795698665/3690ca61-6a9d-4c93-a2a5-83a5f2aa1648/2022-08-16-Trinet-0540-Martinez-Juan.jpg"
                    authorName="Mr. Rumblr"
                    daysOld="2"
                    contentImage="https://foundersbeta.com/wp-content/uploads/2024/09/Startup-Memes-Paying-Customer.png"
                    likeCount="4,392"
                    caption="Beautiful day outside."
                    commentsCount="120"
                    comments={mockComments}
                    onLike={() => console.log("Liked")}
                    onComment={() => console.log("Comment")}
                    onShare={() => console.log("Share")}
                    onSave={() => console.log("Saved")}
                />   
            </div>

    


        </Container>

    )
}