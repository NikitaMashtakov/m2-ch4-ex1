import PropTypes from 'prop-types';
import styles from './Input.module.css';
// type, name, label, placeholder, value
export const Input = ({ label, error, ...props }) => {
  return (
    <div className={styles.container}>
      <label className={styles.inputLabel}>{label}</label>
      <input className={styles.input} {...props} />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
};
