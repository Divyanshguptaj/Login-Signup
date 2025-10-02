import React from "react";

const Button = ({ children, type = "button", onClick, className = "", disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center px-4 py-2 rounded-md text-white
        bg-blue-600 hover:bg-blue-700 shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        disabled:bg-gray-400 disabled:cursor-not-allowed 
        transition-colors duration-200
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
