import styles from "../Comment/Comment.module.css";
import { useState } from "react";
import api from "../../api";
import { timeAgo } from "../../utility";
import UserLink from "../UserLink/UserLink";

export default function Reply({ reply, onReply }) {
  const [isLiked, setIsLiked]     = useState(reply.isLiked);
  const [likeCount, setLikeCount] = useState(reply._count.likes);
  const [loading, setLoading]     = useState(false);

  async function handleLike() {
    setLoading(true);
    await api.request({
      url: `/comments/${reply.id}/like`,
      method: isLiked ? "DELETE" : "POST"
    });
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    setIsLiked(!isLiked);
    setLoading(false);
  }

  return (
    <div className={styles["post__comment"]}>
      <div className={styles["post__comment-avatar"]}>
        <img
          className={styles["post__comment-avatar-image"]}
          src={reply.author.avatar}
          alt={`${reply.author.fname} avatar`}
        />
      </div>

      <div className={styles["post__comment-body"]}>
        <div className={styles["post__comment-header"]}>
          <span className={styles["post__comment-author"]}>
            {/* {reply.author.fname} {reply.author.lname} */}
            <UserLink user={reply.author}/>
          </span>
          <span className={styles["post__comment-time"]}>
            {timeAgo(reply.createdAt)}
          </span>
        </div>

        <p className={styles["post__comment-text"]}>{reply.content}</p>

        <div className={styles["post__comment-actions"]}>
          <button
            className={styles["post__comment-like"]}
            onClick={handleLike}
            disabled={loading}
          >
            {likeCount} Likes
          </button>
          <button
            className={styles["post__comment-reply"]}
            onClick={() => onReply(reply)}
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}