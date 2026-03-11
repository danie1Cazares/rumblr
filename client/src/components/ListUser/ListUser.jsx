

import { useState } from 'react';
import styles from "./ListUser.module.css"

import api from '../../api';


export default function ListUser ({avatar, name, username, actionElement}){

return (

    <>
        <div className={styles["list-user"]}>

            <div className={styles["list-user__details"]}>

                <img
                    className={styles["list-user__avatar"]}
                    src={avatar}
                    alt={`${name} avatar`}
                />

                <div className={styles["list-user__names"]}>
                    <div className={styles["list-user__name"]}>{name}</div>
                    <div className={styles["list-user__username"]}>{username}</div>
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