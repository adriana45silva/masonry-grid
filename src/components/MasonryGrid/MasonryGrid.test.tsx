import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MasonryGrid from '.';
import { Random } from 'unsplash-js/dist/methods/photos/types';

const mockedUseNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actualMock = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actualMock,
    useNavigate: () => mockedUseNavigate,
  };
});

// Mock items
const mockItems = [
  { id: '1', urls: { small: 'url1' } },
  { id: '2', urls: { small: 'url2' } },
  { id: '3', urls: { small: 'url3' } },
] as Random[];

describe('MasonryGrid', () => {
  beforeEach(() => {
    // eslint-disable-next-line no-undef
    global.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the correct number of items', () => {
    render(<MasonryGrid items={mockItems} />);

    expect(screen.getAllByRole('img').length).toBe(mockItems.length);
  });

  it('calculates columns based on width', () => {
    const { container } = render(<MasonryGrid items={mockItems} />);
    const grid = container.firstChild as HTMLElement;

    // Mock the offsetWidth
    Object.defineProperty(grid, 'offsetWidth', {
      configurable: true,
      value: 1000,
    });

    // Trigger a resize event
    fireEvent(window, new Event('resize'));

    // Check if the grid has 3 columns (1000px / 300px = 3.33, floor to 3)
    expect(grid).toHaveStyle('grid-template-columns: repeat(3, 1fr)');
  });

  it('updates columns on window resize', () => {
    const { container } = render(<MasonryGrid items={mockItems} />);
    const grid = container.firstChild as HTMLElement;

    // Mock the offsetWidth
    Object.defineProperty(grid, 'offsetWidth', {
      configurable: true,
      value: 600,
    });

    // Trigger a resize event
    fireEvent(window, new Event('resize'));

    // Check if the grid has 2 columns (600px / 300px = 2)
    expect(grid).toHaveStyle('grid-template-columns: repeat(2, 1fr)');

    // Change the offsetWidth
    Object.defineProperty(grid, 'offsetWidth', {
      configurable: true,
      value: 400,
    });

    // Trigger another resize event
    fireEvent(window, new Event('resize'));

    // Check if the grid has 1 column (400px / 300px = 1.33, floor to 1)
    expect(grid).toHaveStyle('grid-template-columns: repeat(1, 1fr)');
  });
});
