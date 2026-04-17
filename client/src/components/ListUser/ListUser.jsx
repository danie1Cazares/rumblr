

import { useState } from 'react';
import styles from "./ListUser.module.css"
import UserLink from "../UserLink/UserLink"
import api from '../../api';


export default function ListUser ({user, actionElement}){
 
return (

    <>
        <div className={styles["list-user"]}>

            <div className={styles["list-user__details"]}>

                <img
                    className={styles["list-user__avatar"]}
                    src={user.avatar}
                    alt={`${user.fname} avatar`}
                />

                <div className={styles["list-user__names"]}>
                    <UserLink user={user}/>
                    <div className={styles["list-user__username"]}>{user.email}</div>
                </div>

            </div>

             {actionElement}
            {/* <button className={styles["list-user__remove-btn"]}>Remove</button> */}
        </div>

    </>


)
}

            //    {mockSuggestUsers.map(user => (
            //             <ListUser avatar={user.avatar} name={user.name} username={user.username} actionElement={
            //                 <button className={styles["list-user__remove-btn"]}>Following</button>
            //             } />

            //         ))}   