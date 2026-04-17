

import { useState, useEffect } from 'react';
import styles from "./ShowFollowersModal.module.css"
import Container from "../Container/Container";
import api from '../../api';
import ListUser from '../ListUser/ListUser';


export default function ShowFollowersModal({profileUserId, onExitClick}){

const [followers, setFollowers] = useState([]);

    useEffect(() => {
        async function fetchFollowers() {
            const { data } = await api.get(`/users/${profileUserId}/followers`);
            setFollowers(data);
        }
        fetchFollowers();
    }, []);


    return (
        

        <Container modifier={"show-followers"}>  
            <div className={styles["show-followers-modal__exit"]} onClick={onExitClick}>+</div>
        
            <div className={styles["show-followers-modal"]}>
                <div className={styles["show-followers-modal__header"]}>Followers</div>
                <div className={styles["show-followers-modal__search"]}>
                    {/* <label className={styles["show-followers-modal__search-label"]} htmlFor="search">To: </label> */}
                    <input className={styles["show-followers-modal__search-input"]} type='text' id='search' name='search' placeholder='Search...'  />
                </div>


                <div className={styles["show-followers-modal__suggested-users"]}> 
{/* pass list user the whole user and pass user to UserLink */}
                    {followers.map(user => (
                        
                        <ListUser key={user.id} user={user} actionElement={
                            <div style={{display: 'flex', columnGap: '1rem'}}>
                            <button className={styles["list-user__remove-btn"]}>Message</button>
                            <button className={styles["list-user__remove-btn"]}>X</button>
                            </div>
                            // create handleremovefollower function and add to X button onClick
                            // function will take the user.id and create a db call to delete record
                            // will need loading states to disable button when loading
                            // will need to update followers in realtime use setfollower prev=> prev.filter? f.id !== user.id passed in
                            
                        } />
                        // <ListUser key={user.id} avatar={user.avatar} name={`${user.fname} ${user.lname}`} email={user.email} actionElement={
                        //     <button className={styles["list-user__remove-btn"]}>Remove</button>
                        // } />

                    ))}   

                </div>



            </div>



        </Container>

    )
}

 // const mockSuggestUsers = [
    //     {
    //         name: "Sophia Martinez",
    //         username: "sophiam",
    //         avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    //     },
    //     {
    //         name: "Ethan Walker",
    //         username: "ethanw",
    //         avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    //     },
    //     {
    //         name: "Olivia Chen",
    //         username: "olivia.chen",
    //         avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    //     },
    //     {
    //         name: "Marcus Johnson",
    //         username: "marcusj",
    //         avatar: "https://randomuser.me/api/portraits/men/75.jpg"
    //     },
    //     {
    //         name: "Isabella Rodriguez",
    //         username: "isabellar",
    //         avatar: "https://randomuser.me/api/portraits/women/21.jpg"
    //     },
    //     {
    //         name: "Noah Thompson",
    //         username: "noaht",
    //         avatar: "https://randomuser.me/api/portraits/men/54.jpg"
    //     }
    // ];