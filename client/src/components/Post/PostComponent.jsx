import styles from "./PostComponent.module.css";


export default function PostComponent({
  authorAvatar = "",
  authorName = "",
  daysOld = "",
  contentImage = "",
  likeCount = "",
  caption = "",
  commentsCount = "",
  onLike,
  onComment,
  onShare,
  onSave
}) {
  return (
    <div className={styles.post}>
      
      <div className={styles["post__header"]}>
        <div className={styles["post__author-avatar"]}>
          <img
            className={styles["post__author-avatar-image"]}
            src={authorAvatar}
            alt={`${authorName} avatar`}
          />
        </div>

        <div className={styles["post__author-name"]}>
          {authorName}
        </div>

        <div className={styles["post__dot"]}></div>

        <div className={styles["post__days-old"]}>
          {daysOld}d
        </div>
      </div>

      <div className={styles["post__content"]}>
        {contentImage && (
          <img
            className={styles["post__content-image"]}
            src={contentImage}
            alt="Post content"
          />
        )}
      </div>

        <div className={styles["post__actions"]}>

        {/* Left group */}
        <div className={styles["post__actions-left"]}>
            <div className={styles["post__action-like"]} onClick={onLike}>L</div>
            <div className={styles["post__action-comment"]} onClick={onComment}>C</div>
            <div className={styles["post__action-share"]} onClick={onShare}>S</div>
        </div>

        {/* Right (Save button) */}
        <div className={styles["post__actions-right"]}>
            <div className={styles["post__action-save"]} onClick={onSave}>S</div>
        </div>

        </div>


      <div className={styles["post__like-count"]}>
        {likeCount} likes
      </div>

      <div className={styles["post__caption"]}>
        {caption}
      </div>

      <div className={styles["post__view-comments"]}>
        View all {commentsCount} comments
      </div>

    </div>
  );
}



    //     <div className={styles.post}>
      
    //   <div className={styles["post__header"]}>
    //     <div className={styles["post__author-avatar"]}>
    //         <img className={styles["post__author-avatar-image"]} src="https://images.squarespace-cdn.com/content/v1/631ba8eed2196a6795698665/3690ca61-6a9d-4c93-a2a5-83a5f2aa1648/2022-08-16-Trinet-0540-Martinez-Juan.jpg" alt=""/>
    //     </div>
    //     <div className={styles["post__author-name"]}>Mr.Rumblr</div>
    //     <div className={styles["post__dot"]}></div>
    //     <div className={styles["post__days-old"]}>5d</div>
    //   </div>

    //   <div className={styles["post__content"]}><img className={styles["post__content-image"]} src="https://foundersbeta.com/wp-content/uploads/2024/09/Startup-Memes-Paying-Customer.png" alt=""/></div>

    //   <div className={styles["post__actions"]}>
    //     <div className={styles["post__action-like"]}>Like</div>
    //     <div className={styles["post__action-comment"]}>Comment</div>
    //     <div className={styles["post__action-share"]}>Share</div>
    //     <div className={styles["post__action-save"]}>Save</div>
    //   </div>

    //   <div className={styles["post__like-count"]}>2,212 likes</div>
    //   <div className={styles["post__caption"]}>Business, am I right?...</div>
    //   <div className={styles["post__view-comments"]}>View all 233 comments</div>

    // </div>