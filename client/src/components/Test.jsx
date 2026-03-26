import { useState, useRef, useEffect } from 'react';
import styles from "./CreatePostModal.module.css";
import Container from "./Container/Container";
import { supabase } from "../supabase";
import api from '../api';

export default function test() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    // Track component mount status
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleShare = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const fileName = `${Date.now()}-${file.name}`;

      // 1️⃣ Upload image to Supabase
      const { error: uploadError } = await supabase.storage
        .from("posts")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2️⃣ Get public URL
      const { data: publicUrlData, error: urlError } = supabase.storage
        .from("posts")
        .getPublicUrl(fileName);

      if (urlError) throw urlError;

      const imageUrl = publicUrlData.publicUrl;

      // 3️⃣ Create post in backend
      await api.post("/posts", { caption, imageUrl });

      // ✅ Only update state if component is still mounted
      if (!isMounted.current) return;

      setFile(null);
      setPreview(null);
      setCaption("");
      setLoading(false);

      // Close modal
    //   onExitClick();
    } catch (err) {
      console.error("Error creating post:", err);
      if (isMounted.current) setLoading(false);
    }
  };

  return (
    <Container modifier={"create-post"}>
      <div className={styles["create-post-modal"]}>
        <div className={styles["create-post-modal__header"]}>
          {file && (
            <div
              className={styles["create-post-modal__header-prev-nav"]}
              onClick={() => {
                setFile(null);
                setPreview(null);
              }}
            >
              &larr;
            </div>
          )}
          <div className={styles["create-post-modal__header-title"]}>
            Create new post
          </div>
          <div
            className={styles["create-post-modal__header-exit"]}
            
          >
            X
          </div>
        </div>

        {file ? (
          <div className={styles["create-post-modal__content"]}>
            <img
              className={styles["create-post-modal__image-preview"]}
              src={preview}
              alt="Preview"
            />

            <div className={styles["create-post-modal__details"]}>
              <div className={styles["create-post-modal__caption-box"]}>
                <div className={styles["create-post-modal__author"]}>
                  <img
                    className={styles["create-post-modal__author-avatar"]}
                    src="https://images.squarespace-cdn.com/content/v1/631ba8eed2196a6795698665/3690ca61-6a9d-4c93-a2a5-83a5f2aa1648/2022-08-16-Trinet-0540-Martinez-Juan.jpg"
                    alt=""
                  />
                  <div className={styles["create-post-modal__author-name"]}>
                    Cazaresdaniel0
                  </div>
                </div>

                <textarea
                  className={styles["create-post-modal__caption-textarea"]}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Write a caption..."
                />
              </div>

              <button
                className={styles["create-post-modal__button"]}
                onClick={handleShare}
                disabled={loading}
              >
                {loading ? "Uploading..." : "Share"}
              </button>
            </div>
          </div>
        ) : (
          <div className={styles["create-post-modal__image-select"]}>
            <img
              className={styles["create-post-modal__icon"]}
              src="https://static.vecteezy.com/system/resources/thumbnails/056/202/171/small/add-image-or-photo-icon-vector.jpg"
              alt="Select image"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const selected = e.target.files[0];
                if (selected) {
                  setFile(selected);
                  setPreview(URL.createObjectURL(selected));
                }
              }}
            />
          </div>
        )}
      </div>
    </Container>
  );
}
