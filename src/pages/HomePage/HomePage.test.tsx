import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { http, HttpResponse } from 'msw';
import HomePage from '.';
import { UNSPLASH_RANDOM_PHOTOS_DOMAIN } from '../../../mocks/handlers';
import { server } from '../../../mocks/server';

const mockedUseNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actualMock = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actualMock,
    useNavigate: () => mockedUseNavigate,
  };
});

describe('HomePage', () => {
  let mockIntersectionObserver: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockIntersectionObserver = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
    vi.stubGlobal('IntersectionObserver', mockIntersectionObserver);
  });

  it('renders the header with the correct title', () => {
    render(<HomePage />);
    expect(screen.getByText(/Masonry Grid - Made with ❤️ by/)).toBeInTheDocument();
  });

  it('loads items on initial render', async () => {
    render(<HomePage />);

    await waitFor(() => {
      expect(screen.queryByText(/Something went wrong, please try again later/)).toBeFalsy();
    });
  });

  it('shows error message when fetching items fails', async () => {
    server.use(
      http.get(UNSPLASH_RANDOM_PHOTOS_DOMAIN, () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong, please try again later/)).toBeInTheDocument();
    });
  });
});
