

// import { useState } from 'react';
import styles from "./ChatPanel.module.css";
import Container from "../Container/Container";


// import api from '../../api';
// import photo from '../../../'
import { NavLink, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


export default function MessageChatWindowComponent() {


  const navigate = useNavigate();

  const mockUserId = 1;
  const mockChatPartner = {
    avatar: 'https://media.istockphoto.com/id/171369172/photo/pictures-of-real-santa-claus.jpg?s=612x612&w=0&k=20&c=_JYmANDpAZkRAgPcEX-O5H-Ok7FeVYTCPlkKp_nCzzM=',
    username: 'DaGiftgiver',
    name: 'Santa Claus'
  };

   const mockActiveChatThreadMessages = [
  {
    senderId: 2,
    senderName: "Santa Claus",
    senderAvatar: "https://media.istockphoto.com/id/171369172/photo/pictures-of-real-santa-claus.jpg?s=612x612&w=0&k=20&c=_JYmANDpAZkRAgPcEX-O5H-Ok7FeVYTCPlkKp_nCzzM=",
    content: "Ho ho ho! I just finished checking the nice list. How are things on your end?",
    createdAt: "2025-12-10T18:05:00Z"
  },
  {
    senderId: 1,
    senderName: "Alex North",
    senderAvatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=80",
    content: "Busy as always, Santa 😅 Are you really double-checking it?",
    createdAt: "2025-12-10T18:06:30Z"
  },
  {
    senderId: 2,
    senderName: "Santa Claus",
    senderAvatar: "https://media.istockphoto.com/id/171369172/photo/pictures-of-real-santa-claus.jpg?s=612x612&w=0&k=20&c=_JYmANDpAZkRAgPcEX-O5H-Ok7FeVYTCPlkKp_nCzzM=",
    content: "Of course! Accuracy is very important at the North Pole.",
    createdAt: "2025-12-10T18:07:10Z"
  },
  {
    senderId: 1,
    senderName: "Alex North",
    senderAvatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=80",
    content: "Any chance you can move someone from the naughty list to nice? Asking for a friend.",
    createdAt: "2025-12-10T18:08:02Z"
  },
  {
    senderId: 2,
    senderName: "Santa Claus",
    senderAvatar: "https://media.istockphoto.com/id/171369172/photo/pictures-of-real-santa-claus.jpg?s=612x612&w=0&k=20&c=_JYmANDpAZkRAgPcEX-O5H-Ok7FeVYTCPlkKp_nCzzM=",
    content: "Hmm… good deeds between now and Christmas Eve can work wonders 🎄",
    createdAt: "2025-12-10T18:09:15Z"
  },
  {
    senderId: 1,
    senderName: "Alex North",
    senderAvatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=80",
    content: "Noted. I’ll let my friend know 😇",
    createdAt: "2025-12-10T18:10:00Z"
  }
];

  

  return (
    

      <Container modifier="chat-window">
        {/* HEADER */}
        <div className={styles["chat-window__header"]}>
          <div className={styles["chat-window__header-avatar"]}>
            <img
              className={styles["chat-window__header-avatar-image"]}
              src={mockChatPartner.avatar}
              alt={`${mockChatPartner.username} avatar`}
            />
          </div>

          <div className={styles["chat-window__header-details"]}>
            <div className={styles["chat-window__header-username"]}>
              {mockChatPartner.username}
            </div>
            <div className={styles["chat-window__header-name"]}>
              {mockChatPartner.name}
            </div>
          </div>
        </div>

        {/* MESSAGES */}
        <div className={styles["chat-window__messages"]}>
          {mockActiveChatThreadMessages.map((message, i) => (
            <div
              key={i}
              className={styles["chat-window__message"]}
              style={message.senderId === mockUserId ? { alignSelf: "flex-end" } : {}}
            >
              <img
                className={styles["chat-window__message-avatar"]}
                src={
                  message.senderAvatar ||
                  "https://res.cloudinary.com/dkidfx99m/image/upload/v1719707237/uiotniwyo7xalhdurrf9.webp"
                }
                alt=""
              />

              <div className={styles["chat-window__message-body"]}>
                <div className={styles["chat-window__message-username"]}>
                  @{message.senderName}
                </div>

                <div
                  className={styles["chat-window__message-bubble"]}
                  style={
                    message.senderId === mockUserId
                      ? { backgroundColor: "white" }
                      : {}
                  }
                >
                  <p className={styles["chat-window__message-content"]}>
                    {message.content}
                  </p>
                </div>

                <p className={styles["chat-window__message-timestamp"]}>
                  {message.createdAt}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CHAT BAR */}
        <div className={styles["chat-window__chatbar"]}>
          <input
            type="text"
            className={styles["chat-window__chatbar-input"]}
          />
          <div className={styles["chat-window__chatbar-add-image"]} />
        </div>
      </Container>


  );
}


