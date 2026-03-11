

import styles from "./ProfilePanel.module.css";

export default function Profile({ user, posts, onShowFollowersClick, onShowFollowingClick }) {

  return (
    <div className={styles["profile"]}>

      {/* Header */}
      <div className={styles["profile__header"]}>
        <div className={styles["profile__avatar"]}>
          <img
            className={styles["profile__avatar-image"]}
            src={user.avatar}
            alt={`${user.username} avatar`}
          />
        </div>

        <div className={styles["profile__info"]}>
          <div className={styles["profile__username-section"]}>
            <h2 className={styles["profile__username"]}>{user.username}</h2>
            <button className={styles["profile__edit-button"]} onClick={()=>{window.location.href = '/settings'}}>Edit Profile</button>

          </div>

          <div className={styles["profile__stats"]}>
            <div className={styles["profile__stat"]}>
              <span className={styles["profile__stat-number"]}>{posts.length}</span> posts
            </div>
            <div className={styles["profile__stat"]} onClick={onShowFollowersClick}>
              <span className={styles["profile__stat-number"]} >{user.followers.length}</span> followers
            </div>
            <div className={styles["profile__stat"]} onClick={onShowFollowingClick}>
              <span className={styles["profile__stat-number"]} >{user.following.length}</span> following
            </div>
          </div>

          <div className={styles["profile__full-name"]}>{user.fullName}</div>
          <div className={styles["profile__full-name"]}>@{user.username}</div>
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
              src={post.contentImage}
              alt={post.caption}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
