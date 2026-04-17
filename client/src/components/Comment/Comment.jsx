import styles from "./Comment.module.css";
import timeAgo from "../../utility";
import { useState, useEffect } from "react";
import api from "../../api";
import Reply from '../Reply/Reply';
import UserLink from "../UserLink/UserLink";

export default function Comment({
  comment, updateComments, handleSetReply, newReply
}) {

  const [loading, setLoading] = useState(false);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [commentIsLiked, setCommentIsLiked] = useState(comment.isLiked);
  const [commentLikeCount, setCommentLikeCount] = useState(comment._count.likes);
  const [replies, setReplies] = useState(null);
  const [showReplies, setShowReplies] = useState(false);
  const hasReplies = comment._count.replies ? comment._count.replies : null;


  async function handleShowReplies() {
    setShowReplies(!showReplies); //toggle showReplies
    if (replies === null) await fetchReplies(); // only fetch replies if they haven't been fetched yet 
  }
  
  async function fetchReplies() {
    setLoadingReplies(true);
    const { data } = await api.get(`comments/${comment.id}/replies`);
    setReplies(data);


    setLoadingReplies(false);

  }

  async function handleCommentLike() {
    setLoading(true);

    await api.request({ url: `/comments/${comment.id}/like`, method: commentIsLiked ? "DELETE" : "POST" });

    setCommentLikeCount(prev => commentIsLiked ? prev - 1 : prev + 1);
    setCommentIsLiked(!commentIsLiked);
    updateComments(comment.id, { isLiked: commentIsLiked, _count: { ...comment._count, likes: commentLikeCount } });
    setLoading(false);

  }

  // whenever parent passes a new reply, append it
  useEffect(() => {
    if (!newReply) return;
    setReplies(prev => prev ? [...prev, newReply] : [newReply]);
    setShowReplies(true);
  }, [newReply]);

  return (
    <div className={styles["post__comment"]}>

      <div className={styles["post__comment-avatar"]}>
        <img
          className={styles["post__comment-avatar-image"]}
          src={comment.author.avatar}
          alt={`${comment.author.fname} avatar`}
        />
      </div>

      <div className={styles["post__comment-body"]}>

        <div className={styles["post__comment-header"]}>
          <span className={styles["post__comment-author"]}>
            {/* {comment.author.fname} {comment.author.lname} */}
            <UserLink user={comment.author}/>
          </span>
          <span className={styles["post__comment-time"]}>
            {timeAgo(comment.createdAt)}
          </span>
        </div>

        <p className={styles["post__comment-text"]}>
          {comment.content}
        </p>

        <div className={styles["post__comment-actions"]}>
          <button
            className={styles["post__comment-like"]}
            onClick={handleCommentLike} disabled={loading}
          >
            {commentLikeCount} Likes
          </button>

          <button
            className={styles["post__comment-reply"]}
            onClick={() => { handleSetReply(comment); }}
          >Reply
          </button>

          {hasReplies && <button
            className={styles["post__comment-reply"]}
            onClick={handleShowReplies} disabled={loadingReplies}
          >
          {showReplies ? '- Hide replies' : `- View replies (${comment._count.replies})`}
          </button>
          }
        </div>

        <div className={styles["post__comment-replies"]}>
          {replies && showReplies && replies.map(reply => (
            <Reply
              key={reply.id}
              reply={reply}
              onReply={handleSetReply}
            />
          ))}
        </div>

      </div>
    </div >

  );
}
