

import styles from './MessagePanel.module.css'
import { useState } from 'react';
import SendMessageModal from "../SendMessageModal/SendMessageModal";

export default function MessagePanel () {

    const [showSendMessageModal, setShowSendMessageModal] = useState(false);
    const onSendMessageClick = () => {
      setShowSendMessageModal(!showSendMessageModal);
    }
    
  
  return (
    <>
      {showSendMessageModal && <SendMessageModal onExitClick={()=>{setShowSendMessageModal(false)}} />}

      <div className={styles["message-panel"]}>
        <div className={styles["message-panel__header"]}>
                  <div className="">Cazaresdaniel0</div>
                  <div className={styles["message-panel__new-message-btn"]} onClick={onSendMessageClick}>+</div>
        </div>
        <input
          className={styles["message-panel__input"]}
          placeholder="Search messages"
        />
      </div>
    
    </>

  );
}
