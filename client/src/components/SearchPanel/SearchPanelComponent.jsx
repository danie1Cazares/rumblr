
import styles from './SearchPanelComponent.module.css'

export default function SearchPanel({ isOpen }) {
  return (
    <div
      className={
        isOpen
          ? styles["search-panel--open"]
          : styles["search-panel"]
      }
    >
      <div className={styles["search-panel__header"]}>Search</div>
      <input
        className={styles["search-panel__input"]}
        placeholder="Search"
      />
    </div>
  );
}
