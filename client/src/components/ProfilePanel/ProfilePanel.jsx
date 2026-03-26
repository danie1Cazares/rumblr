

import styles from "./ProfilePanel.module.css";
import { useEffect, useState } from "react";
import api from "../../api"

export default function Profile({ user, posts, activeLoggedInUser, onShowFollowersClick, onShowFollowingClick }) {

  const userAvatar = user.avatar ? user.avatar : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

    const [isFollowing, setIsFollowing] = useState(null); // null = still loading
    const [loading, setLoading] = useState(false);
    const [followersCount, setFollowersCount] = useState(user.followersCount);
    const [followingCount, setFollowingCount] = useState(user.followingCount);

    // Check follow status when profile loads
    useEffect(() => {
      async function checkFollowStatus() {
        const res = await api.get(`/users/${user.id}/follow-status`);
        setIsFollowing(res.data.isFollowing);
      }

      checkFollowStatus();
    }, []); 

    // Toggle follow/unfollow
    async function handleFollowClick() {
      setLoading(true);

      //update current display without creating db query
      if (isFollowing) setFollowersCount(followersCount-1) 
        else setFollowersCount(followersCount+1); 

      await api.request({
        url: `/users/${user.id}/follow`,
        method: isFollowing ? "DELETE" : "POST"
      });

      setIsFollowing(!isFollowing); // flip the state
      setLoading(false);
    }



  if (activeLoggedInUser) return (

    <div className={styles["profile"]}>

      {/* Header */}
      <div className={styles["profile__header"]}>

        <div className={styles["profile__avatar"]}>
          <img
            className={styles["profile__avatar-image"]}
            // src={`${user.avatar} ? ${user.avatar} : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'`}
            src={userAvatar}
            alt={`${user.email} avatar`}
          />
        </div>

        <div className={styles["profile__info"]}>
          <div className={styles["profile__username-section"]}>
            <h2 className={styles["profile__username"]}>{user.email}</h2>
            {activeLoggedInUser && <button className={styles["profile__edit-button"]} onClick={() => { window.location.href = '/settings' }}>Edit Profile</button>}
            {/* if user is logged in show edit profile button */}
          </div>

          <div className={styles["profile__stats"]}>
            <div className={styles["profile__stat"]}>
              <span className={styles["profile__stat-number"]}>{posts.length}</span> posts
            </div>
            <div className={styles["profile__stat"]} onClick={onShowFollowersClick}>
              <span className={styles["profile__stat-number"]} >{user.followersCount}</span> followers
            </div>
            <div className={styles["profile__stat"]} onClick={onShowFollowingClick}>
              <span className={styles["profile__stat-number"]} >{user.followingCount}</span> following
            </div>
          </div>

          <div className={styles["profile__full-name"]}>{user.fname} {user.lname}</div>
          <div className={styles["profile__full-name"]}>@{user.email}</div>
          <div className={styles["profile__bio"]}>{user.bio}</div>
        </div>
      </div>

      {/* TOGGLE POST VIEW */}
      <div className={styles["profile__toggle-post-view"]}>
        <div className={styles["profile__toggle-user"]}>USER</div>
        <div className={styles["profile__toggle-saved"]}>SAVED</div>
      </div>

      {/* Posts grid */}
      <div className={styles["profile__posts"]}>
        {posts.map((post) => (
          <div key={post.id} className={styles["profile__post"]}>
            <img
              className={styles["profile__post-image"]}
              src={post.imageUrl}
              alt={post.caption}
            />
          </div>
        ))}
      </div>
    </div>

  )

  else return (
    <div className={styles["profile"]}>

      {/* Header */}
      <div className={styles["profile__header"]}>
        <div className={styles["profile__avatar"]}>
          <img
            className={styles["profile__avatar-image"]}
            // src={`${user.avatar} ? ${user.avatar} : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'`}
            src={userAvatar}
            alt={`${user.email} avatar`}
          />
        </div>

        <div className={styles["profile__info"]}>
          <div className={styles["profile__username-section"]}>
            <h2 className={styles["profile__username"]}>{user.email}</h2>
            {/* {activeLoggedInUser && <button className={styles["profile__edit-button"]} onClick={() => { window.location.href = '/settings' }}>Edit Profile</button>} */}
            {/* <button className={styles["profile__edit-button"]} onClick={() => { window.location.href = '/settings' }}>Edit Profile</button> */}
            {/* if user is logged in show edit profile button */}
          </div>

          <div className={styles["profile__stats"]}>
            <div className={styles["profile__stat"]}>
              <span className={styles["profile__stat-number"]}>{posts.length}</span> posts
            </div>
            <div className={styles["profile__stat"]} onClick={onShowFollowersClick}>
              <span className={styles["profile__stat-number"]} >{followersCount}</span> followers
            </div>
            <div className={styles["profile__stat"]} onClick={onShowFollowingClick}>
              <span className={styles["profile__stat-number"]} >{followingCount}</span> following
            </div>
          </div>

          <div className={styles["profile__full-name"]}>{user.fname} {user.lname}</div>
          <div className={styles["profile__full-name"]}>@{user.email}</div>
          <div className={styles["profile__bio"]}>{user.bio}</div>

          <div className={styles["profile__actions"]}>
            {/* <button className={styles["profile__actions-btn"]}>Follow</button> */}
            
            {isFollowing === null ? (
            // Still fetching — show nothing or a skeleton
            <button className={styles["profile__actions-btn"]} disabled>...</button>
            ) : (
              <button className={styles["profile__actions-btn"]} onClick={handleFollowClick} disabled={loading}>
                {loading ? "..." : isFollowing ? "Unfollow" : "Follow"}
              </button>
            )}

            <button className={styles["profile__actions-btn"]}>Messsage</button>
          </div>
        </div>
      </div>



      {/* TOGGLE POST VIEW */}
      <div className={styles["profile__toggle-post-view"]}>
        <div className={styles["profile__toggle-user"]}>USER</div>
        <div className={styles["profile__toggle-saved"]}>SAVED</div>
      </div>

      {/* Posts grid */}
      <div className={styles["profile__posts"]}>
        {posts.map((post) => (
          <div key={post.id} className={styles["profile__post"]}>
            <img
              className={styles["profile__post-image"]}
              src={post.imageUrl}
              alt={post.caption}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
