import React from 'react';
import { Random } from 'unsplash-js/dist/methods/photos/types';

interface Exif extends Random {
  exif: {
    make: string;
    model: string;
    name: string;
    exposure_time: string;
    aperture: string;
    focal_length: string;
    iso: number;
  };
}

export interface ImageDetailsExif {
  image: Exif;
}

const ImageDetails = ({ image }: ImageDetailsExif): JSX.Element => {
  const utmParams = 'utm_source=masonry-grid&utm_medium=referral';

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">{image.alt_description || 'Untitled Image'}</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="mb-6 md:mb-0">
          <img
            src={image.urls.regular}
            alt={image.alt_description || 'Image'}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div className="space-y-4">
          <p className="text-gray-700">
            <span className="font-semibold">Description 📝</span>{' '}
            {image.description || 'No description available'}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Photographer 🤳 </span>
            <span>
              <a
                href={`${image.user.links.html}/?${utmParams}`}
                className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                {image.user.name}
              </a>{' '}
              @{' '}
              <a
                href={`https://unsplash.com/?${utmParams}`}
                className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                Unsplash
              </a>
            </span>
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Date Taken 📆 </span>{' '}
            {new Date(image.created_at).toLocaleDateString()}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Likes ❤️ </span> {image.likes}
          </p>
          {image.location.name && (
            <p className="text-gray-700">
              <span className="font-semibold">Location 📍 </span> {image.location.name}
            </p>
          )}
          {image.exif.name && (
            <p className="text-gray-700">
              <span className="font-semibold">Camera 📸</span> {image.exif.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageDetails;
