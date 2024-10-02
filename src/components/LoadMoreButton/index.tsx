import React, { useEffect, useRef } from 'react';

interface LoadMoreButtonProps {
  loading: boolean;
  onClick: () => void;
}

const LOAD_THRESHOLD = 0.5;
const MARGIN = '0px';

const LoadMoreButton = ({ loading, onClick }: LoadMoreButtonProps): JSX.Element => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const currentButton = buttonRef.current;
    if (!currentButton) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !loading) {
          onClick();
        }
      },
      {
        threshold: LOAD_THRESHOLD,
        root: null,
        rootMargin: MARGIN,
      },
    );

    observer.observe(currentButton);

    return () => {
      if (currentButton) {
        observer.unobserve(currentButton);
      }
    };
  }, [onClick, loading]);

  return (
    <div className={`text-center my-8`}>
      <button
        ref={buttonRef}
        onClick={onClick}
        className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? 'Loading... ⏳ ' : 'Load More 🔄'}
      </button>
    </div>
  );
};

export default LoadMoreButton;
