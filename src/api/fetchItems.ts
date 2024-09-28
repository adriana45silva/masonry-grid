import { createApi } from 'unsplash-js';
import { UnsplashImage } from './types';
// import { GridItem } from '@/components/MasonryGrid/types';


const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY 
});

// const generateItem = (photos: UnsplashImage): UnsplashImage => ({
//   id: `item-${photos.id}`,
//   description: photos.description || photos.alt_description || 'No description',
//   width: 300,
//   height: Math.floor(Math.random() * 300) + 150 
// });

export const fetchItems = async (count: number): Promise<UnsplashImage[]> => {
  try {
    const result = await unsplash.photos.getRandom({ count });
    
    if (result.type === 'error') {
      throw {
        message: result.errors[0],
        status: result.status
      };
    }

    const photos = Array.isArray(result.response) ? result.response : [result.response];
    
    // The response should already match the UnsplashImage type
    return photos as UnsplashImage[];

  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};