interface BackToHomeButtonProps {
  onClick: () => void;
  className?: string;
}

const BackToHomeButton = ({ onClick, className = '' }: BackToHomeButtonProps): JSX.Element => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ${className}`}
    >
      👈 Back to Home
    </button>
  );
};

export default BackToHomeButton;