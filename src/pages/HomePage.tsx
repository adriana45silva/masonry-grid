import { useState, useCallback, useEffect, useRef } from 'react';
import MasonryGrid from '@/components/MasonryGrid/';
import LoadMoreButton from '@/components/LoadMoreButton/';
import Header from '@/components/Header';
import { Random } from 'unsplash-js/dist/methods/photos/types';
import { fetchItems} from '@/api/fetchItems';


const HomePage = () => {
  const [items, setItems] = useState<Random[]>([]);
  const [showFailureFeedback, setFailureFeedback] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const initialLoadDone = useRef(false);

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const newItems = await fetchItems(20);
      setItems(prevItems => [...prevItems, ...newItems]);
    } catch (error) {
      setFailureFeedback(true)
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initialLoadDone.current) {
      loadItems();
      initialLoadDone.current = true;
    }
  }, [loadItems]);



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
