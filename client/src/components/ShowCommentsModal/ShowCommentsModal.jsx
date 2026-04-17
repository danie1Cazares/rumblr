


import { useState, useEffect, useRef } from 'react';
import styles from "./ShowCommentsModal.module.css";
import Container from "../Container/Container";
import Post from '../Post/Post';
import api from '../../api';
import Comment from '../Comment/Comment';
import timeAgo from '../../utility'
import PostCaption from '../PostCaption/PostCaption';
import UserLink from '../UserLink/UserLink';


export default function ShowComments({ post, onLike, onSave, onShare, onComment, loading, isLiked, isSaved, postLikes, onExitClick, onCommentCountUpdate, commentCount }) {
  
  const [commentText, setCommentText] = useState('');
  const [postComments, setPostComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState([]);
  const [replyTo, setReplyTo] = useState(null); // { commentId, username }
  const inputRef = useRef(null);

  function handleSetReply(comment) {
    setReplyTo({ commentId: comment.id, username: comment.author.email });
    setCommentText(`@${comment.author.email} `); // autofill input
    inputRef.current?.focus(); // focus the input automatically
  }

  // clear replyTo if user manually clears the input
function handleInputChange(e) {
  setCommentText(e.target.value);
  if (replyTo && !e.target.value.includes(`@${replyTo.username}`)) {
    setReplyTo(null);
  }
}
 
  async function handleAddComment() {
    if (!commentText.trim()) return; // don't submit empty comments

    const { data } = await api.post(`/posts/${post.id}/comments`, {
      content: commentText
    });

    setCommentText('')
    setPostComments(prev => [data, ...prev]);         // add to top of list
    onCommentCountUpdate();
  }

  async function handleAddReply() {

    if (!commentText.trim()) return; // don't submit empty comments

    const { data } = await api.post(`/comments/${replyTo.commentId}/replies`, {
      content: commentText,
      postId: post.id
    });


    setCommentText('');
    setReplyTo(null);

    // update local comment replies

    setPostComments(prev =>
      prev.map(c => c.id === replyTo.commentId
        ? { ...c, _count: { ...c._count, replies: c._count.replies + 1 }, newReply: data } // ← attach new reply to the comment
        : c
      )
    );
  
  onCommentCountUpdate();
  }

  async function updateComments(commentId, changes) {

    setPostComments(prev =>
      prev.map(c => c.id === commentId ? { ...c, ...changes } : c)
    );
  }

  
  useEffect(() => {
    let ignore = false;

    async function fetchComments() {
      // setLoadingComments(true);

      const { data } = await api.get(`/posts/${post.id}/comments`);

      if (!ignore) {

        // only fetch if we haven't already
        if (postComments.length === 0) {

          setPostComments(data);
          // setLoadingComments(false);
        }
      }
    }

    fetchComments();
  return () => { ignore = true; };
}, []);


  return (
    <Container modifier={"show-comments"}>

      <div className={styles["show-comments-modal__exit"]} onClick={onExitClick}>+</div>

      <div className={styles["show-comments-modal"]}>
        <img className={styles["show-comments-modal__img"]} src={post.imageUrl} alt="" />
        <div className={styles["post--displayCommentsView"]}>

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
          </div>


          <div className={styles["post__caption"]}>
            <PostCaption post={post}/>
          </div>

          <div className={styles["post__comments"]}>
            {postComments.length === 0 ? (
              <div className={styles["post__comments-empty"]}>
                No comments yet. Be the first 💬
              </div>
            ) : (
              postComments.map((postComment) => (
                <Comment
                  key={postComment.id}
                  comment={postComment}
                  updateComments={updateComments}
                  handleSetReply={handleSetReply}
                  newReply={postComment.newReply ?? null}
                />
              ))
            )}
          </div>



          <div className={styles["post__actions"]}>

            {/* Left group */}

            <div className={styles["post__actions-left"]}>
              {isLiked ?
                <div className={styles["post__action-like"]} onClick={onLike} disabled={loading.like}><span className={`material-symbols-outlined ${styles.filled}`}>thumb_up</span></div>
                :
                <div className={styles["post__action-like"]} onClick={onLike} disabled={loading.like}><span class="material-symbols-outlined">thumb_up</span></div>
              }
              <div>{postLikes}</div>
              <div className={styles["post__action-comment"]} onClick={onComment}><span class="material-symbols-outlined">mode_comment</span></div>
              <div>{commentCount}</div>
              <div className={styles["post__action-share"]} onClick={onShare}><span class="material-symbols-outlined">send</span></div>
            </div>

            {/* Right (Save button) */}

      
            {isSaved ?
              <div className={styles["post__actions-right"]}>
                <div className={styles["post__action-save"]} onClick={onSave} disabled={loading.save}><span className={`material-symbols-outlined ${styles.filled}`}>bookmark</span></div>
              </div>
              :
              <div className={styles["post__actions-right"]}>
                <div className={styles["post__action-save"]} onClick={onSave} disabled={loading.save}><span className="material-symbols-outlined">bookmark</span></div>
              </div>
            }

          </div>

          <div className={styles["post__days-old"]}>
            {timeAgo(post.createdAt)}
          </div>

          <div className={styles["post__add-comments"]}>
            <div className={styles["post__author-avatar"]}>
              <img
                className={styles["post__author-avatar-image"]}
                src={post.author.avatar}
                alt={`${post.author.fname} ${post.author.lname} avatar`}
              />
            </div>


            <input type="text" ref={inputRef} name="add-comment" id="add-comment" placeholder="Add a comment..." value={commentText} onChange={handleInputChange} onKeyDown={e => e.key === 'Enter' && (replyTo ? handleAddReply() : handleAddComment())}/>
            
            <div className={styles["post__add-comment-btn"]} onClick={replyTo ? handleAddReply : handleAddComment}>Post</div>
     

          </div>
          
        </div>
      </div >
    </Container>
  )
}

