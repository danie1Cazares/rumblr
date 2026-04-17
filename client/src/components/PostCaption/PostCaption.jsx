import styles from "./PostCaption.module.css";
import timeAgo from "../../utility";
import UserLink from "../UserLink/UserLink";
export default function PostCaption({
post
}) {



  return (
    <div className={styles["post__comment"]}>

      <div className={styles["post__comment-avatar"]}>
        <img
          className={styles["post__comment-avatar-image"]}
          src={post.author.avatar}
          alt={`${post.author.fname} avatar`}
        />
      </div>

      <div className={styles["post__comment-body"]}>

        <div className={styles["post__comment-header"]}>
          <span className={styles["post__comment-author"]}>
            {/* {post.author.fname} {post.author.lname} */}
            <UserLink user={post.author} />
          </span>
          <span className={styles["post__comment-time"]}>
            {timeAgo(post.createdAt)}
          </span>
        </div>

        <p className={styles["post__comment-text"]}>
          {post.caption}
        </p>

      </div>
    </div>
  );
}
