interface LoadMoreButtonProps {
  loading: boolean;
  onClick: () => void;
}

const LoadMoreButton = ({
  loading,
  onClick,
}: LoadMoreButtonProps): JSX.Element => {
  return (
    <div className={`text-center my-8`}>
      <button
        onClick={onClick}
        className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? 'Loading... ⏰ ' : 'Load More 🔄'}
      </button>
    </div>
  );
};

export default LoadMoreButton;