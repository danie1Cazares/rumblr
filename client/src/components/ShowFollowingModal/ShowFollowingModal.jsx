// Ensure consistent naming

// git hub upload

// **back end stuff**
// wrap up front end styling
// make responsive
// add front end transitions/animations



import { useState } from 'react';
import styles from "./ShowFollowingModal.module.css"
import Container from "../Container/Container";
import api from '../../api';
import ListUser from '../ListUser/ListUser';

export default function ShowFollowingModal({onExitClick}){

    const mockSuggestUsers = [
        {
            name: "Sophia Martinez",
            username: "sophiam",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            name: "Ethan Walker",
            username: "ethanw",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            name: "Olivia Chen",
            username: "olivia.chen",
            avatar: "https://randomuser.me/api/portraits/women/68.jpg"
        },
        {
            name: "Marcus Johnson",
            username: "marcusj",
            avatar: "https://randomuser.me/api/portraits/men/75.jpg"
        },
        {
            name: "Isabella Rodriguez",
            username: "isabellar",
            avatar: "https://randomuser.me/api/portraits/women/21.jpg"
        },
        {
            name: "Noah Thompson",
            username: "noaht",
            avatar: "https://randomuser.me/api/portraits/men/54.jpg"
        }
    ];

    return (
        

        <Container modifier={"show-following"}>  
            <div className={styles["show-following-modal__exit"]} onClick={onExitClick}>+</div>
        
            <div className={styles["show-following-modal"]}>
                <div className={styles["show-following-modal__header"]}>Followers</div>
                <div className={styles["show-following-modal__search"]}>
                    {/* <label className={styles["show-following-modal__search-label"]} htmlFor="search">To: </label> */}
                    <input className={styles["show-following-modal__search-input"]} type='text' id='search' name='search' placeholder='Search...'  />
                </div>


                <div className={styles["show-following-modal__suggested-users"]}> 

                    {mockSuggestUsers.map(user => (
                        <ListUser avatar={user.avatar} name={user.name} username={user.username} actionElement={
                            <button className={styles["list-user__remove-btn"]}>Following</button>
                        } />

                    ))}   
  

                </div>



            </div>



        </Container>

    )
}