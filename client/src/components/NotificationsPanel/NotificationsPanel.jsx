
import styles from './NotificationsPanel.module.css'

export default function NotificationsPanel({ isOpen }) {

 const mockNotifications = [
  {
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    content: "jenny_rose started following you",
    timestamp: "2m ago"
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    content: "mike.codes liked your photo",
    timestamp: "15m ago"
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    content: "laura.design mentioned you in a comment",
    timestamp: "1h ago"
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    content: "alex.dev and 3 others liked your post",
    timestamp: "3h ago"
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/66.jpg",
    content: "sofia.art replied to your story",
    timestamp: "Yesterday"
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/91.jpg",
    content: "john_trav requested to follow you",
    timestamp: "2 days ago"
  }
];

 const mockFollowRequests = [
  {
    avatar: "https://randomuser.me/api/portraits/women/25.jpg",
    username: "luna.sketch",
    name: "Luna Martinez",
    timestamp: "2025-01-18T11:05:00Z"
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    username: "dev.jon",
    name: "Jonathan Parker",
    timestamp: "2025-01-17T22:30:00Z"
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    username: "taylor_reads",
    name: "Taylor Brooks",
    timestamp: "2025-01-17T18:10:00Z"
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/78.jpg",
    username: "samuel.travels",
    name: "Samuel Bennett",
    timestamp: "2025-01-16T14:45:00Z"
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    username: "naomi.codes",
    name: "Naomi Chen",
    timestamp: "2025-01-15T09:25:00Z"
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/16.jpg",
    username: "musicby_leo",
    name: "Leo Anderson",
    timestamp: "2025-01-13T20:00:00Z"
  }
];

const lastFollowRequest = mockFollowRequests.reduce((latest, current) =>
  new Date(current.timestamp) > new Date(latest.timestamp) ? current : latest
);



  return (
    <div
      className={
        isOpen
          ? styles["notifications-panel--open"]
          : styles["notifications-panel"]
      }
    >
      <div className={styles["notifications-panel__header"]}>Notifications</div>

      <div className={styles["notifications-panel__follow-req"]}>

        <div className={styles["notifications-panel__follow-req-avatar"]}>
                  <img
                    className={styles["notifications-panel__follow-req-avatar-image"]}
                    src={lastFollowRequest.avatar}
                    alt={`${lastFollowRequest.name} avatar`}
                  />
        </div>

        <div>
             <div className={styles["notifications__follow-req-title"]}>Follow Requests</div>
             <div className={styles["notifications__follow-req-subtitle"]}>{lastFollowRequest.name} + {mockFollowRequests.length} others</div>       
        </div>

        <div className={styles["notifications-panel__follow-req-details"]}>
            <div className={styles["notifications-panel__new-update-dot"]}></div>
            <div className={styles["notifications-panel__chevron-icon"]}></div>
        </div>

      </div>
    
        <div className={styles["notifications-panel__notifications"]}>
            <div className={styles["notifications-panel__notifications-title"]}>Earlier</div>

                {mockNotifications.map(notification => (
                        <div className={styles["notifications-panel__notification"]}>
                            <img className={styles["notifications-panel__notification-avatar"]} src={notification.avatar} />
                            <div className={styles["notifications-panel__notification-content"]}> {notification.content}
                                <div className={styles["notifications-panel__notification-timestamp"]}>{notification.timestamp} </div>
                            </div>
                        
                        </div>
                ))}

        </div>
    
    </div>
  );
}
