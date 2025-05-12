import { icons } from "../utils/icons";
import React from "react";


const Button = ({ type, title, icon, variant, onClick }) => {
  return (
    <button
      className={`w-full flex items-center justify-center gap-2 rounded-3xl  py-3 px-6 ${variant} group`}
      type={type}
      onClick={onClick}
    >
      <span
        className={`font-semibold group text-sm  cursor-pointer capitalize`}
      >
        {title}
      </span>
      {icon && (
        <span className="text-2xl text-white">
          <img src={icons[icon]} className="w-4 h-4" alt="icon" />
        </span>
      )}
    </button>
  );
};

export default Button;
