import PropTypes from 'prop-types';
import styles from './Button.module.css';

export const Button = ({ children, ...props }) => {
  return (
    <button className={styles.submitButton} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string,
};
