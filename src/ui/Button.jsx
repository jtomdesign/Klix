import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  type,
  onClick,
  to,

  children = "Button",
  disabled,
}) => {
  const base = `inline-block bg-blueTom-200 text-md rounded-full px-6 py-4 font-bold cursor-pointer  tracking-wide hover:bg-blueTom-300 focus:ring-blueTom-300 transition-colors duration-300 `;

  const styles = {
    primary: base + "",
    outline:
      " inline-block text-md rounded-full px-6 py-4 font-bold text-blueTom-50  border-2 border-blue-50 cursor-pointer focus:ring-blueTom-300 transition-colors duration-300  ",
    small:
      "inline-block text-sm rounded-full px-4 py-2 font-bold text-blueTom-50 hover:text-blueTom-100 hover:border-blueTom-100  border-2 border-blue-50 cursor-pointer focus:ring-blueTom-300 transition-colors duration-300 ",
  };

  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={styles[type]} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
