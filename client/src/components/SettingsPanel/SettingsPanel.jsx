


import { useState } from "react";
import styles from "./SettingsPanel.module.css";

export default function SettingsPanel() {
  const [showPwForm, setShowPwForm] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showBioForm, setShowBioForm] = useState(false);

  return (
    <div className={styles["settings-panel"]}>
      <div className={styles["settings-panel__container"]}>
        
        <h2 className={styles["settings-panel__header"]}>Settings</h2>

        {/* Account Section */}
        <h3 className={styles["settings-panel__subheader"]}>Account</h3>

        <div className={styles["settings-panel__action"]}>
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
          <form className={styles["settings-panel__form"]}>
            <label className={styles["settings-panel__label"]} htmlFor="current-pw">
              Current password
            </label>
            <input
              id="current-pw"
              type="password"
              className={styles["settings-panel__input"]}
            />

            <label className={styles["settings-panel__label"]} htmlFor="new-pw">
              New password
            </label>
            <input
              id="new-pw"
              type="password"
              className={styles["settings-panel__input"]}
            />

            <label className={styles["settings-panel__label"]} htmlFor="confirm-pw">
              Confirm password
            </label>
            <input
              id="confirm-pw"
              type="password"
              className={styles["settings-panel__input"]}
            />

            <button className={styles["settings-panel__button"]} type="submit">
              Save
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

        {showProfileForm && (
          <div className={styles["settings-panel__profile"]}>
            <div className={styles["settings-panel__user"]}>
              <img
                className={styles["settings-panel__avatar"]}
                src="https://thelightcommittee.com/wp-content/uploads/elementor/thumbs/studio-business-headshot-of-a-black-man-in-Los-Angeles-r42uipeyz48g590yz1bhrtos4flfu3q2tuzohhy7f4.jpg"
                alt="User avatar"
              />

              <div className={styles["settings-panel__identity"]}>
                <div className={styles["settings-panel__username"]}>
                  cazaresdaniel0
                </div>
                <div className={styles["settings-panel__name"]}>
                  Daniel Cazares
                </div>
              </div>
            </div>

            <button className={styles["settings-panel__button"]}>
              Change photo
            </button>
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
          <div className={styles["settings-panel__bio"]}>
            <textarea
              className={styles["settings-panel__textarea"]}
              defaultValue="No matter how the wind howls the mountain cannot bow to it"
            />

            <button className={styles["settings-panel__button"]}>
              Save
            </button>
          </div>
        )}

      </div>
    </div>
  );
}



