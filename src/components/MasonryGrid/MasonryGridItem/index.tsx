import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Random } from 'unsplash-js/dist/methods/photos/types';

interface MasonryGridItemProps {
  image: Random;
}

const MasonryGridItem = ({ image }: MasonryGridItemProps): JSX.Element | null => {
  const navigate = useNavigate();
  const RANDOM_IMG_HEIGHT = Math.floor(Math.random() * 300) + 150;

  if (!image) {
    return null;
  }

  const handleClick = () => {
    navigate(`/item/${image.id}`, { state: image });
  };

  return (
    <div
      className="relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition duration-300 group"
      onClick={handleClick}
      style={{ height: `${RANDOM_IMG_HEIGHT}px` }}
    >
      <img
        loading="lazy"
        src={image.urls?.small}
        alt={image.alt_description || 'Image'}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-lg font-semibold text-white truncate">
          {image.alt_description || 'Untitled Image'}
        </h3>
        <p className="text-sm text-gray-200">Click to view details</p>
      </div>
    </div>
  );
};

export default MasonryGridItem;
