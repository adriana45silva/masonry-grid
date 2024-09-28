import { createApi } from 'unsplash-js';
import { Random } from 'unsplash-js/dist/methods/photos/types';

const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY 
});

export const fetchItems = async (count: number): Promise<Random[]> => {
  try {
    const result = await unsplash.photos.getRandom({ count });
    
    if (result.type === 'error') {
      throw {
        message: `Error fetching random images: ${result.errors[0]}`,
        status: result.status
      };
    }

    const photos = Array.isArray(result.response) ? result.response : [result.response];
    return photos

  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};