import styles from "./Post.module.css";
import api from "../../api";
import { useState } from "react";
import ShowCommentsModal from "../ShowCommentsModal/ShowCommentsModal";
import Comment from "../Comment/Comment";
import {timeAgo} from '../../utility'
import UserLink from "../UserLink/UserLink";

export default function Post({
  // displayCommentsView = false,
  post,
  // comments,
  //temp added below to avoid errors
  onLike,
  onComment,
  onShare,
  onSave
}) {

  // const [comments, setComments] = useState([])
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [postLikes, setPostLikes] = useState(post._count.likes);
  
  // const hasComments = comments?.length > 0;


  const [loading, setLoading] = useState({
    like: false,
    save: false,
    share: false,
    comment: false
  });

  const [commentCount, setCommentCount] = useState(post._count.comments);

  function handleCommentCountUpdate() {
    //increments comment count
    setCommentCount(prev => prev + 1);
  }

  async function handleViewComments() {
    // if (showCommentsModal) return setShowCommentsModal(false); // toggle closed

    // only fetch if we haven't already
    // if (comments.length === 0) {
    //   setActionLoading('comment', true);
    //   const { data } = await api.get(`/posts/${post.id}/comments`);
    //   setComments(data);
    //   setActionLoading('comment', false);
    // }

    setShowCommentsModal(!showCommentsModal);
  }
  // helper to toggle a specific action's loading state
  function setActionLoading(action, value) {
    setLoading(prev => ({ ...prev, [action]: value }));
  }


  async function handleLike() {
    setActionLoading('like', true);
    await api.request({ url: `/posts/${post.id}/like`, method: isLiked ? "DELETE" : "POST" });

    setPostLikes(prev => isLiked ? prev - 1 : prev + 1);

    setIsLiked(!isLiked);
    setActionLoading('like', false);
  }

  async function handleSave() {
    setActionLoading('save', true);
    await api.request({ url: `/posts/${post.id}/save`, method: isSaved ? "DELETE" : "POST" });
    setIsSaved(!isSaved);
    setActionLoading('save', false);
  }



  return (
    <>
     {showCommentsModal && <ShowCommentsModal post={post} onLike={handleLike} onSave={handleSave} onComment={()=>{console.log('comment')}} onShare={()=>{console.log('share')}} loading={loading} isLiked={isLiked} isSaved={isSaved} postLikes={postLikes} onExitClick={()=>{setShowCommentsModal(false)}} onCommentCountUpdate={handleCommentCountUpdate} commentCount={commentCount}/>}
     {/* {showCommentsModal && <ShowCommentsModal post={post} comments={comments} onLike={handleLike} onSave={handleSave} onComment={()=>{console.log('comment')}} onShare={()=>{console.log('share')}} loading={loading} isLiked={isLiked} isSaved={isSaved} postLikes={postLikes} onExitClick={()=>{setShowCommentsModal(false)}} />} */}


      <div className={styles.post}>
        
        <div className={styles["post__header"]}>
          <div className={styles["post__author-avatar"]}>
            <img
              className={styles["post__author-avatar-image"]}
              src={post.author.avatar}
              alt={`${post.author.fname} ${post.author.lname} avatar`}
            />
          </div>

          <div className={styles["post__author-name"]}>
            {/* {`${post.author.fname} ${post.author.lname}`} */}
            <UserLink user={post.author}/>
          </div>

          <div className={styles["post__dot"]}></div>

          <div className={styles["post__days-old"]}>
            {timeAgo(post.createdAt)}
          </div>
        </div>

        <div className={styles["post__content"]}>
          {post.imageUrl && (
            <img
              className={styles["post__content-image"]}
              src={post.imageUrl}
              alt="Post content"
            />
          )}
        </div>

          <div className={styles["post__actions"]}>

          {/* Left group */}
          <div className={styles["post__actions-left"]}>
            {isLiked ?
              <div className={styles["post__action-like"]} onClick={handleLike} disabled={loading.like}><span className={`material-symbols-outlined ${styles.filled}`}>thumb_up</span></div>
              :
              <div className={styles["post__action-like"]} onClick={handleLike} disabled={loading.like}><span class="material-symbols-outlined">thumb_up</span></div>
            }
              <div className={styles["post__action-comment"]} onClick={onComment}><span class="material-symbols-outlined">mode_comment</span></div>
              <div className={styles["post__action-share"]} onClick={onShare}><span class="material-symbols-outlined">send</span></div>
          </div>

          {/* Right (Save button) */}
          {isSaved ? 
            <div className={styles["post__actions-right"]}>
              <div className={styles["post__action-save"]} onClick={handleSave} disabled={loading.save}><span className={`material-symbols-outlined ${styles.filled}`}>bookmark</span></div>
            </div>
          :
            <div className={styles["post__actions-right"]}>
              <div className={styles["post__action-save"]} onClick={handleSave} disabled={loading.save}><span className="material-symbols-outlined">bookmark</span></div>
            </div>
          }

          </div>


        <div className={styles["post__like-count"]}>
          {postLikes} likes
        </div>

        <div className={styles["post__caption"]}>
          {post.caption}
        </div>

        <div className={styles["post__view-comments"]} onClick={handleViewComments}>
          View all {commentCount} comments
        
        </div>

      </div>

      
    </>

  );
}

