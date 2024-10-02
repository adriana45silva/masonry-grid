import { http, HttpResponse } from 'msw';
import getRandom from './fixtures/getRandom.json';

export const UNSPLASH_RANDOM_PHOTOS_DOMAIN = 'https://api.unsplash.com/photos/random';

export const handlers = [
  http.get(`${UNSPLASH_RANDOM_PHOTOS_DOMAIN}`, () => {
    return HttpResponse.json(getRandom);
  }),
];
