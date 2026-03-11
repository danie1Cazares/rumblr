
import { useState } from 'react';
import styles from "./CreatePostModal.module.css";
import Container from "../Container/Container";
import api from '../../api';


export default function CreatePost({onExitClick}){

    const [fileIsUploaded, setFileIsUploaded] = useState(false);

    return (
        

        <Container modifier={"create-post"}>  

            <div className={styles["create-post-modal"]}>
                <div className={styles["create-post-modal__header"]}>
                    {fileIsUploaded && (
                    <div className={styles["create-post-modal__header-prev-nav"]} onClick={() => setFileIsUploaded(false)}>&larr;</div>
                    )}
                    <div className={styles["create-post-modal__header-title"]}>Create new post</div>
                    <div className={styles["create-post-modal__header-exit"]} onClick={onExitClick}>X</div>
                </div>

                {fileIsUploaded ? (
                    <div className={styles["create-post-modal__content"]}>
                        <img className={styles["create-post-modal__image-preview"]} src="https://plus.unsplash.com/premium_photo-1737553342718-1e51135e4ab5?q=80&w=693&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />

                        <div className={styles["create-post-modal__details"]}>
                            <div className={styles["create-post-modal__caption-box"]}>
                            <div className={styles["create-post-modal__author"]}>
                                <img className={styles["create-post-modal__author-avatar"]} src="https://images.squarespace-cdn.com/content/v1/631ba8eed2196a6795698665/3690ca61-6a9d-4c93-a2a5-83a5f2aa1648/2022-08-16-Trinet-0540-Martinez-Juan.jpg" alt="" />
                                <div className={styles["create-post-modal__author-name"]}>Cazaresdaniel0</div>
                            </div>

                            <textarea className={styles["create-post-modal__caption-textarea"]}></textarea>
                            </div>

                            <button className={styles["create-post-modal__button"]}>Share</button>
                        </div>
                    </div>
                ) : (
                    <div className={styles["create-post-modal__image-select"]}>
                        <img className={styles["create-post-modal__icon"]} src="https://static.vecteezy.com/system/resources/thumbnails/056/202/171/small/add-image-or-photo-icon-vector.jpg" alt="" />
                        <button className={styles["create-post-modal__button"]} onClick={() => setFileIsUploaded(true)}>Select from computer</button>
                    </div>
                )}
            </div>


        </Container>

    )
}