import { useRef, useEffect, useState, useMemo } from 'react';
import { UnsplashImage } from '@/api/types';
import MasonryGridItem from './MasonryGridItem';

interface MasonryGridProps {
  items: UnsplashImage[];
}

const MasonryGrid = ({ items }: MasonryGridProps): JSX.Element => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const updateColumns = () => {
      const width = gridRef.current?.offsetWidth || 0;
      setColumns(Math.max(1, Math.floor(width / 300)));
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const renderItems = useMemo(() => {
    return items.map((item) => (
      <MasonryGridItem key={item.id} image={item} />
    ));
  }, [items, columns]);

  return (
    <div
      ref={gridRef}
      className="grid gap-4"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {renderItems}
    </div>
  );
};

export default MasonryGrid;