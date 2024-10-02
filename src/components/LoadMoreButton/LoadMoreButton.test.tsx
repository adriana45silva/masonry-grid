import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import LoadMoreButton from '.';

describe('LoadMoreButton', () => {
  let mockIntersectionObserver: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockIntersectionObserver = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
    vi.stubGlobal('IntersectionObserver', mockIntersectionObserver);
  });

  it('renders the button with "Load More 🔄" text when not loading', () => {
    render(<LoadMoreButton loading={false} onClick={() => {}} />);
    const button = screen.getByRole('button', { name: /Load More 🔄/i });
    expect(button).toBeInTheDocument();
  });

  it('renders the button with "Loading... ⏳" text when loading', () => {
    render(<LoadMoreButton loading={true} onClick={() => {}} />);
    const button = screen.getByRole('button', { name: /Loading... ⏳/i });
    expect(button).toBeInTheDocument();
  });

  it('calls onClick when the button is clicked and not loading', () => {
    const mockOnClick = vi.fn();
    render(<LoadMoreButton loading={false} onClick={mockOnClick} />);
    const button = screen.getByRole('button', { name: /Load More 🔄/i });
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('disables the button when loading', () => {
    render(<LoadMoreButton loading={true} onClick={() => {}} />);
    const button = screen.getByRole('button', { name: /Loading... ⏳/i });
    expect(button).toBeDisabled();
  });

  it('enables the button when not loading', () => {
    render(<LoadMoreButton loading={false} onClick={() => {}} />);
    const button = screen.getByRole('button', { name: /Load More 🔄/i });
    expect(button).toBeEnabled();
  });

  it('does not call onClick when the button is clicked while loading', () => {
    const mockOnClick = vi.fn();
    render(<LoadMoreButton loading={true} onClick={mockOnClick} />);
    const button = screen.getByRole('button', { name: /Loading... ⏳/i });
    fireEvent.click(button);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('calls onClick when button becomes visible and not loading', () => {
    const mockOnClick = vi.fn();
    render(<LoadMoreButton loading={false} onClick={mockOnClick} />);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const [observerCallback] = mockIntersectionObserver.mock.calls[0];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    observerCallback([{ isIntersecting: true }]);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when button becomes visible but is loading', () => {
    const mockOnClick = vi.fn();
    render(<LoadMoreButton loading={true} onClick={mockOnClick} />);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const [observerCallback] = mockIntersectionObserver.mock.calls[0];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    observerCallback([{ isIntersecting: true }]);

    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
