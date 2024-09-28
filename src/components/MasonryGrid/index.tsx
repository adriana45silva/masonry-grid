import { useRef, useEffect, useState, useMemo } from 'react';
import MasonryGridItem from './MasonryGridItem';
import { Random } from 'unsplash-js/dist/methods/photos/types';

interface MasonryGridProps {
  items: Random[];
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
    return items.map((item, index) => (
      <MasonryGridItem 
        key={`${item.id}-${index}`} 
        image={item} 
      />
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