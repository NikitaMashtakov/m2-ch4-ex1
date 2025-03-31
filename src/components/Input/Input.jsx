import styles from './Input.module.css';
// type, name, label, placeholder, value
export const Input = ({ label, error, ...props }) => {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <input {...props} />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
