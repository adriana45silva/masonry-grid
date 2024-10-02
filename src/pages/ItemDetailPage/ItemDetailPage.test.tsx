import { ImageDetailsExif } from '@/components/ImageDetails';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Location, useLocation, useNavigate } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ItemDetailPage from '.';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useLocation: vi.fn(),
}));

describe('ItemDetailPage', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useLocation).mockReturnValue({ state: null } as Location);
  });

  it('renders no image data message when image is not available', () => {
    render(<ItemDetailPage />);
    expect(screen.getByText('No image data available 🔍')).toBeInTheDocument();
  });

  it('renders image details', () => {
    const mockImage = {
      id: '123',
      urls: { regular: 'http://example.com/image.jpg' },
      user: {
        links: { html: 'http://example.com/image' },
      },
      location: {
        name: 'bar',
      },
      exif: {
        name: 'exif',
      },
    } as ImageDetailsExif['image'];

    vi.mocked(useLocation).mockReturnValue({ state: mockImage } as Location);
    render(<ItemDetailPage />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockImage.urls.regular);
  });

  it('navigates back to home when back button is clicked', () => {
    const mockImage = {
      id: '123',
      urls: { regular: 'http://example.com/image.jpg' },
      user: {
        links: { html: 'http://example.com/image' },
      },
      location: {
        name: 'location',
      },
      exif: {
        name: 'exif',
      },
    } as ImageDetailsExif['image'];

    vi.mocked(useLocation).mockReturnValue({ state: mockImage } as Location);

    render(<ItemDetailPage />);
    fireEvent.click(screen.getByRole('button', { name: /👈 Back to Home/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
