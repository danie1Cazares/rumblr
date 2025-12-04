import styles from "./Wrapper.module.css";

export default function Wrapper({ children, modifier }) {
  const className = modifier
    ? `${styles.wrapper} ${styles[`wrapper--${modifier}`]}`
    : styles.wrapper;
  return <div className={className}>{children}</div>;
}
