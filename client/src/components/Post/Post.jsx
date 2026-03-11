import styles from "./Post.module.css";
import { useState } from "react";
import ShowCommentsModal from "../ShowCommentsModal/ShowCommentsModal";
import Comment from "../Comment/Comment";

export default function Post ({
  displayCommentsView = false,
  authorAvatar = "",
  authorName = "",
  daysOld = "",
  contentImage = "",
  likeCount = "",
  caption = "",
  commentsCount = "",
  comments = [],
  onLike,
  onComment,
  onShare,
  onSave
}) {

  const hasComments = comments?.length > 0;
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const onShowCommentsClick = () => {
    setShowCommentsModal(!showCommentsModal);
  }

  if (displayCommentsView) return (
    <>
      {/* {showCommentsModal && <ShowCommentsModal onExitClick={()=>{setShowCommentsModal(false)}} />} */}

      <div className={styles["post--displayCommentsView"]}>
        
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
        </div>

        
        <div className={styles["post__caption"]}>
            <Comment
              
                  avatar={authorAvatar}
                  author={authorName}
                  content={caption}
                  createdAt={daysOld}
                  onLike={() => console.log(comment.id)}
                  onReply={() => console.log(comment.id)}
            />
        </div>
        
          <div className={styles["post__comments"]}>
            {!hasComments ? (
              <div className={styles["post__comments-empty"]}>
                No comments yet. Be the first 💬
              </div>
            ) : (
              comments.map((comment) => (
                <Comment
                  key={comment.id}
                  avatar={comment.avatar}
                  author={comment.author}
                  content={comment.text}
                  createdAt={comment.createdAt}
                  onLike={() => console.log(comment.id)}
                  onReply={() => console.log(comment.id)}
                />
              ))
            )}
          </div>



          <div className={styles["post__actions"]}>

          {/* Left group */}
          <div className={styles["post__actions-left"]}>
              
              <div className={styles["post__action-like"]} onClick={onLike}><span class="material-symbols-outlined">thumb_up</span></div> 
              <div>{likeCount}</div>
              <div className={styles["post__action-comment"]} onClick={onComment}><span class="material-symbols-outlined">mode_comment</span></div>
              <div>{commentsCount}</div>
              <div className={styles["post__action-share"]} onClick={onShare}><span class="material-symbols-outlined">send</span></div>
          </div>

          {/* Right (Save button) */}
          <div className={styles["post__actions-right"]}>
              <div className={styles["post__action-save"]} onClick={onSave}><span class="material-symbols-outlined">bookmark</span></div>
          </div>

          </div>

        <div className={styles["post__days-old"]}>
            {daysOld}d
        </div>

        <div className={styles["post__add-comments"]}>
           <div className={styles["post__author-avatar"]}>
              <img
                className={styles["post__author-avatar-image"]}
                src={authorAvatar}
                alt={`${authorName} avatar`}
              />
          </div>
          <input type="text" name="add-comment" id="add-comment" placeholder="Add a comment..." />
        
        </div>

      </div>

      
    </>  
  ) 

  // if displayCommentsView is false then displayFeedView

  return (
    <>
     {showCommentsModal && <ShowCommentsModal onExitClick={()=>{setShowCommentsModal(false)}} />}


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
              <div className={styles["post__action-like"]} onClick={onLike}><span class="material-symbols-outlined">thumb_up</span></div>
              <div className={styles["post__action-comment"]} onClick={onComment}><span class="material-symbols-outlined">mode_comment</span></div>
              <div className={styles["post__action-share"]} onClick={onShare}><span class="material-symbols-outlined">send</span></div>
          </div>

          {/* Right (Save button) */}
          <div className={styles["post__actions-right"]}>
              <div className={styles["post__action-save"]} onClick={onSave}><span class="material-symbols-outlined">bookmark</span></div>
          </div>

          </div>


        <div className={styles["post__like-count"]}>
          {likeCount} likes
        </div>

        <div className={styles["post__caption"]}>
          {caption}
        </div>

        <div className={styles["post__view-comments"]} onClick={onShowCommentsClick}>
          View all {commentsCount} comments
        
        </div>

      </div>

      
    </>

  );
}

