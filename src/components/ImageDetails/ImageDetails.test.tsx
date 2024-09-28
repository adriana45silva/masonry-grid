import { render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import ImageDetails, { ImageDetailsExif } from '.';

const mockImage = {
  alt_description: 'A beautiful landscape',
  description: 'A serene mountain lake at sunset',
  urls: {
    regular: 'https://example.com/image.jpg',
  },
  user: {
    name: 'John Doe',
    links: {
      html: 'https://unsplash.com/@johndoe',
    },
  },
  created_at: '2023-01-01T12:00:00Z',
  likes: 100,
  location: {
    name: 'Yosemite National Park',
  },
  exif: {
    name: 'Canon EOS 5D Mark IV',
    make: '',
    model: '',
    exposure_time: '',
    aperture: '',
    focal_length: '',
    iso: 0,
  },
} as ImageDetailsExif['image'];

describe('ImageDetails', () => {
  beforeEach(() => {
    render(<ImageDetails image={mockImage} />);
  });

  it('renders the image title', () => {
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('A beautiful landscape');
  });

  it('displays the image', () => {
    const img = screen.getByAltText('A beautiful landscape');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('shows the description', () => {
    expect(screen.getByText('A serene mountain lake at sunset')).toBeInTheDocument();
  });

  it('displays the photographer name with correct link', () => {
    const photographerLink = screen.getByText('John Doe');
    expect(photographerLink).toHaveAttribute(
      'href',
      'https://unsplash.com/@johndoe/?utm_source=masonry-grid&utm_medium=referral',
    );
  });

  it('shows the Unsplash link', () => {
    const unsplashLink = screen.getByText('Unsplash');
    expect(unsplashLink).toHaveAttribute(
      'href',
      'https://unsplash.com/?utm_source=masonry-grid&utm_medium=referral',
    );
  });

  it('displays the creation date', () => {
    expect(screen.getByText('1/1/2023')).toBeInTheDocument();
  });

  it('shows the number of likes', () => {
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('displays the location', () => {
    expect(screen.getByText('Yosemite National Park')).toBeInTheDocument();
  });

  it('shows the camera information', () => {
    expect(screen.getByText('Canon EOS 5D Mark IV')).toBeInTheDocument();
  });
});

describe('ImageDetails with missing data', () => {
  it('handles missing alt_description', () => {
    const imageWithoutAlt = { ...mockImage, alt_description: null };
    render(<ImageDetails image={imageWithoutAlt} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Untitled Image');
  });

  it('handles missing description', () => {
    const imageWithoutDescription = { ...mockImage, description: null };
    render(<ImageDetails image={imageWithoutDescription} />);
    expect(screen.getByText('No description available')).toBeInTheDocument();
  });

  it('does not display location if missing', () => {
    const imageWithoutLocation = {
      ...mockImage,
      location: { name: null },
    } as ImageDetailsExif['image'];
    render(<ImageDetails image={imageWithoutLocation} />);
    expect(screen.queryByText('Location 📍')).not.toBeInTheDocument();
  });

  it('does not display camera info if missing', () => {
    const imageWithoutExif = {
      ...mockImage,
      exif: { ...mockImage.exif, name: '' },
    };
    render(<ImageDetails image={imageWithoutExif} />);
    expect(screen.queryByText('Camera 📸')).not.toBeInTheDocument();
  });
});
