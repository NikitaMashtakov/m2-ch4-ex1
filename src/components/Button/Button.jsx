import styles from './Button.module.css';

export const Button = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};
