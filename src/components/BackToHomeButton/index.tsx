import React from 'react';

interface BackToHomeButtonProps {
  onClick: () => void;
}

const BackToHomeButton = ({ onClick }: BackToHomeButtonProps): JSX.Element => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300`}
    >
      👈 Back to Home
    </button>
  );
};

export default BackToHomeButton;
