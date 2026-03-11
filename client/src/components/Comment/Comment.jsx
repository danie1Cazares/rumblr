import styles from "./Comment.module.css";

export default function Comment({
  avatar,
  author,
  content,
  createdAt,
  onLike,
  onReply
}) {
  return (
    <div className={styles["post__comment"]}>

      <div className={styles["post__comment-avatar"]}>
        <img
          className={styles["post__comment-avatar-image"]}
          src={avatar}
          alt={`${author} avatar`}
        />
      </div>

      <div className={styles["post__comment-body"]}>

        <div className={styles["post__comment-header"]}>
          <span className={styles["post__comment-author"]}>
            {author}
          </span>
          <span className={styles["post__comment-time"]}>
            {createdAt}
          </span>
        </div>

        <p className={styles["post__comment-text"]}>
          {content}
        </p>

        <div className={styles["post__comment-actions"]}>
          <button
            className={styles["post__comment-like"]}
            onClick={onLike}
          >
            Like
          </button>

          <button
            className={styles["post__comment-reply"]}
            onClick={onReply}
          >
            Reply
          </button>
        </div>

      </div>
    </div>
  );
}
