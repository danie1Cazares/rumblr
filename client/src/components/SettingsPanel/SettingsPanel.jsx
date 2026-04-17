


import { useState } from "react";
import styles from "./SettingsPanel.module.css";
import { supabase } from "../../supabase";
import api from '../../api';
import { useAuth } from "../../context/AuthContext";
  import { useRef } from 'react';
  import { useNavigate } from "react-router-dom";


export default function SettingsPanel() {
  const [showPwForm, setShowPwForm] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showBioForm, setShowBioForm] = useState(false);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [changeAvatarError, setChangeAvatarError] = useState('');
  const [changeAvatarSuccess, setChangeAvatarSuccess] = useState('');

  const fileInputRef = useRef(null);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [bioForm, setBioForm] = useState({loading: false, textarea: user?.bio, error: '', success:''});
  const [pwForm, setPwForm] = useState({currentPw: '', newPw: '', confirmPw: '', error: '', success:'', loading: false});
  function handlePwFormChange(e) {
    setPwForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleBioUpdate (e) {
    e.preventDefault();
    setBioForm(prev => ({ ...prev, error: '', success: '' }));

    try {
      const updatedUser = {...user, bio: bioForm.textarea }
      await api.put("/users/update", { updatedUser });
      setBioForm(prev => ({...prev, loading: false, success: 'Bio updated sucessfully'}));
    } catch(err) {
      setBioForm(prev => ({ ...prev, error: err.response?.data?.message || 'Something went wrong', loading: false }));
    }


  }

  async function handlePasswordUpdate(e) {
    e.preventDefault();
    setPwForm(prev => ({ ...prev, error: '', success: '' }));

    if (pwForm.newPw !== pwForm.confirmPw) return setPwForm(prev => ({ ...prev, error: 'New passwords do not match' }));
    if (pwForm.newPw.length < 6) return setPwForm(prev => ({ ...prev, error: 'Password must be at least 6 characters' }));

    setPwForm(prev => ({ ...prev, loading: true }));

    try {
      await api.put('/auth/change-password', {
        currentPassword: pwForm.currentPw,
        newPassword: pwForm.newPw
      });
      setPwForm({ currentPw: '', newPw: '', confirmPw: '', error: '', success: 'Password updated successfully', loading: false });
    } catch (err) {
      setPwForm(prev => ({ ...prev, error: err.response?.data?.message || 'Something went wrong', loading: false }));
    }
  }

  const handleLogOut = async () => {
    await api.put('/auth/logout');
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const handleAvatarUpdate = async () => {
    if (!file) return;
    setLoading(true);
    setChangeAvatarError('');
    setChangeAvatarSuccess('');

    try {
      const fileName = `${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      const imageUrl = publicUrlData.publicUrl;

      const updatedUser = { ...user, avatar: imageUrl }
      console.log(updatedUser);
      await api.put("/users/update", { updatedUser });

    } catch (err) {
      console.error("Error updating avatar:", err);
      setChangeAvatarError("Error updating avatar:", err);

    } finally {
      setChangeAvatarSuccess("Avatar updated successfully.");
      setLoading(false);
      setFile(false);
    }
  };

  return (
    <div className={styles["settings-panel"]}>
      <div className={styles["settings-panel__container"]}>
        
        <h2 className={styles["settings-panel__header"]}>Settings</h2>

        {/* Account Section */}
        <h3 className={styles["settings-panel__subheader"]}>Account</h3>

        <div className={styles["settings-panel__action"]} onClick={handleLogOut}>
          Log Out
        </div>

        <div
          className={`${styles["settings-panel__action"]} ${
            showPwForm ? styles["settings-panel__action--active"] : ""
          }`}
          onClick={() => setShowPwForm(!showPwForm)}
        >
          Change Password
        </div>

        {showPwForm && (
          <form className={styles["settings-panel__form"]} onSubmit={handlePasswordUpdate}>

            {pwForm.error && <p className={styles["settings-panel__error"]}>{pwForm.error}</p>}
            {pwForm.success && <p className={styles["settings-panel__success"]}>{pwForm.success}</p>}

            <label className={styles["settings-panel__label"]} htmlFor="current-pw">Current password</label>
            <input
              id="current-pw"
              name="currentPw"
              type="password"
              className={styles["settings-panel__input"]}
              value={pwForm.currentPw}
              onChange={handlePwFormChange}
            />

            <label className={styles["settings-panel__label"]} htmlFor="new-pw">New password</label>
            <input
              id="new-pw"
              name="newPw"
              type="password"
              className={styles["settings-panel__input"]}
              value={pwForm.newPw}
              onChange={handlePwFormChange}
            />

            <label className={styles["settings-panel__label"]} htmlFor="confirm-pw">Confirm password</label>
            <input
              id="confirm-pw"
              name="confirmPw"
              type="password"
              className={styles["settings-panel__input"]}
              value={pwForm.confirmPw}
              onChange={handlePwFormChange}
            />

            <button className={styles["settings-panel__button"]} type="submit" disabled={pwForm.loading}>
              {pwForm.loading ? 'Saving...' : 'Save'}
            </button>
          </form>
        )}

        {/* Profile Section */}
        <h3 className={styles["settings-panel__subheader"]}>Profile</h3>

        <div
          className={`${styles["settings-panel__action"]} ${
            showProfileForm ? styles["settings-panel__action--active"] : ""
          }`}
          onClick={() => setShowProfileForm(!showProfileForm)}
        >
          Change Profile Photo
        </div>

        {changeAvatarError && <p className={styles["settings-panel__error"]}>{changeAvatarError}</p>}
        {changeAvatarSuccess && <p className={styles["settings-panel__success"]}>{changeAvatarSuccess}</p>}

        {showProfileForm && (
          <div className={styles["settings-panel__profile"]}>

            <div className={styles["settings-panel__user"]}>
              <img
                className={styles["settings-panel__avatar"]}
                // src="https://thelightcommittee.com/wp-content/uploads/elementor/thumbs/studio-business-headshot-of-a-black-man-in-Los-Angeles-r42uipeyz48g590yz1bhrtos4flfu3q2tuzohhy7f4.jpg"
                src={preview ? preview : user?.avatar}
                alt="User avatar"
              />

              <div className={styles["settings-panel__identity"]}>
                <div className={styles["settings-panel__username"]}>
                  {user.email}
                </div>
                <div className={styles["settings-panel__name"]}>
                  {user.fname} {user.lname}
                </div>
              </div>
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={(e) => {
                const selected = e.target.files[0];
                if (selected) {
                  setFile(selected);
                  setPreview(URL.createObjectURL(selected));
                }
              }}
            />

            
            <button className={styles["settings-panel__button"]} onClick={() => fileInputRef.current.click()} >
              Change photo
            </button>

              {/* if image has been selected show the save button */}
            {file && <button className={styles["settings-panel__button"]} disabled={loading} onClick={handleAvatarUpdate} >
              Save
            </button>}


          </div>
        )}

        {/* Bio Section */}
        <div
           className={`${styles["settings-panel__action"]} ${
            showBioForm ? styles["settings-panel__action--active"] : ""
          }`}
          onClick={() => setShowBioForm(!showBioForm)}
        >
          Edit Bio
        </div>

        {showBioForm && (
          <form className={styles["settings-panel__bio"]} onSubmit={handleBioUpdate}>

            {bioForm.error && <p className={styles["settings-panel__error"]}>{bioForm.error}</p>}
            {bioForm.success && <p className={styles["settings-panel__success"]}>{bioForm.success}</p>}

            <textarea
              className={styles["settings-panel__textarea"]}
              defaultValue={user?.bio}
              value={bioForm.textarea}
              onChange={(e) => { setBioForm(prev => ({ ...prev, textarea: e.target.value })) }}
            />

            <button className={styles["settings-panel__button"]} disabled={bioForm.loading} >
              Save
            </button>
          </form>
        )}

      </div>
    </div>
  );
}


        // {file ? (
        //   <div className={styles["create-post-modal__content"]}>
        //     <img
        //       className={styles["create-post-modal__image-preview"]}
        //       src={preview}
        //       alt="Preview"
        //     />

        //     <div className={styles["create-post-modal__details"]}>
        //       <div className={styles["create-post-modal__caption-box"]}>
        //         <div className={styles["create-post-modal__author"]}>
        //           <img
        //             className={styles["create-post-modal__author-avatar"]}
        //             src="https://images.squarespace-cdn.com/content/v1/631ba8eed2196a6795698665/3690ca61-6a9d-4c93-a2a5-83a5f2aa1648/2022-08-16-Trinet-0540-Martinez-Juan.jpg"
        //             alt=""
        //           />
        //           <div className={styles["create-post-modal__author-name"]}>
        //             Cazaresdaniel0
        //           </div>
        //         </div>

        //         <textarea
        //           className={styles["create-post-modal__caption-textarea"]}
        //           value={caption}
        //           onChange={(e) => setCaption(e.target.value)}
        //           placeholder="Write a caption..."
        //         />
        //       </div>

        //       <button
        //         className={styles["create-post-modal__button"]}
        //         onClick={handleShare}
        //         disabled={loading}
        //       >
        //         {loading ? "Uploading..." : "Share"}
        //       </button>
        //     </div>
        //   </div>
        // ) : (
        //   <div className={styles["create-post-modal__image-select"]}>
        //     <img
        //       className={styles["create-post-modal__icon"]}
        //       src="https://static.vecteezy.com/system/resources/thumbnails/056/202/171/small/add-image-or-photo-icon-vector.jpg"
        //       alt="Select image"
        //     />
        //     <input
        //       type="file"
        //       accept="image/*"
        //       onChange={(e) => {
        //         const selected = e.target.files[0];
        //         if (selected) {
        //           setFile(selected);
        //           setPreview(URL.createObjectURL(selected));
        //         }
        //       }}
        //     />
        //   </div>
        // )}


          // {file && (
          //   <div
          //     className={styles["create-post-modal__header-prev-nav"]}
          //     onClick={() => {
          //       setFile(null);
          //       setPreview(null);
          //     }}
          //   >
          //     &larr;
          //   </div>
          // )}