import { ImageDetailsExif } from '@/components/ImageDetails';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import MasonryGridItem from '.';

const mockedUseNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actualMock = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actualMock,
    useNavigate: () => mockedUseNavigate,
  };
});

const mockImage = {
  id: '1234',
  alt_description: 'A beautiful landscape',
  urls: {
    small: 'https://example.com/image.jpg',
  },
} as ImageDetailsExif['image'];

describe('MasonryGridItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the image with correct src and alt text', () => {
    render(<MasonryGridItem image={mockImage} />);
    const img = screen.getByAltText('A beautiful landscape');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('renders default alt text when alt_description is missing', () => {
    const imageWithoutAlt = { ...mockImage, alt_description: null };
    render(<MasonryGridItem image={imageWithoutAlt} />);
    expect(screen.getByAltText('Image')).toBeInTheDocument();
  });

  it('renders the overlay text on hover', () => {
    render(<MasonryGridItem image={mockImage} />);
    expect(screen.getByText('A beautiful landscape')).toBeInTheDocument();
    expect(screen.getByText('Click to view details')).toBeInTheDocument();
  });

  it('renders "Untitled Image" when alt_description is missing in overlay', () => {
    const imageWithoutAlt = { ...mockImage, alt_description: null };
    render(<MasonryGridItem image={imageWithoutAlt} />);
    expect(screen.getByText('Untitled Image')).toBeInTheDocument();
  });

  it('navigates to the correct route when clicked', () => {
    render(<MasonryGridItem image={mockImage} />);
    fireEvent.click(screen.getByRole('img'));

    expect(mockedUseNavigate).toHaveBeenCalledWith('/item/1234', {
      state: mockImage,
    });
  });
});
