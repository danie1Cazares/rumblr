import styles from "./Container.module.css";

export default function Container({ children, modifier }) {
  const className = modifier
    ? `${styles.container} ${styles[`container--${modifier}`]}`
    : styles.container;
  return <div className={className}>{children}</div>;
}
