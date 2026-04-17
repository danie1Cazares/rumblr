import { useNavigate } from 'react-router-dom';
import styles from './UserLink.module.css';

export default function UserLink({ user }) {
  const navigate = useNavigate();

  return (
    <span
      className={styles["user-link"]}
      onClick={() => navigate(`/profile/${user.id}`)}
    >
      {user.fname} {user.lname}
    </span>
  );
}