import React from 'react';

const Button = ({ onClick, disabled, children, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md font-semibold text-white transition-colors
        ${
          disabled
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
        }`}
    >
      {children}
    </button>
  );
};

export default Button;
