import { useState, useCallback, useEffect } from 'react';
import MasonryGrid from '@/components/MasonryGrid/';
import { fetchItems } from '@/api/fetchItems';
import LoadMoreButton from '@/components/LoadMoreButton/';
import { UnsplashImage } from '@/api/types';
import Header from '@/components/Header';

const HomePage = () => {
  const [items, setItems] = useState<UnsplashImage[]>([]);
  const [showFailureFeedback, setFailureFeedback] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const newItems = await fetchItems(10);
      setItems(prevItems => [...prevItems, ...newItems]);
    } catch (error: any) {
      setFailureFeedback(true)
    } finally {
      setLoading(false);
    }
  }, [items.length]);

  useEffect(() => {
    loadItems();
  }, []);


  return (
    <section>
      <Header>
        <h1 className="text-2xl font-bold my-4">Masonry Grid - Made with ❤️ by <a href="https://www.linkedin.com/in/adriana45silva/" target="_blank" rel="noopener noreferrer">adriana45silva</a></h1>
      </Header>
      <main className="container mx-auto p-4 pt-8">
        {
          showFailureFeedback ? <h1 className="text-2xl font-bold my-4 text-center">Something went wrong, please try again later 🥲</h1> : 
          <>
            <MasonryGrid items={items} />
            <LoadMoreButton loading={loading} onClick={loadItems} />
          </>
        }
      </main> 
    </section>
  );
};

export default HomePage;
