import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import BackToHomeButton from '.';

describe('BackToHomeButton', () => {
  it('renders the button with correct text', () => {
    render(<BackToHomeButton onClick={() => {}} />);
    const button = screen.getByRole('button', { name: /👈 Back to Home/i });
    expect(button).toBeInTheDocument();
  });

  it('calls onClick when the button is clicked', () => {
    const mockOnClick = vi.fn();
    render(<BackToHomeButton onClick={mockOnClick} />);
    const button = screen.getByRole('button', { name: /👈 Back to Home/i });
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
