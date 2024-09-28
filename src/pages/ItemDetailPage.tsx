import { useNavigate, useLocation } from 'react-router-dom';
import ImageDetails from '../components/ImageDetails';
import BackToHomeButton from '../components/BackToHomeButton';
import { UnsplashImage } from '@/api/types';

const ItemDetailPage = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const image = location.state as UnsplashImage;

  const handleBackClick = () => {
    navigate('/');
  };

  if (!image) {
    return <h1 className="text-2xl font-bold my-4 text-center">No image data available 🔍</h1>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <BackToHomeButton onClick={handleBackClick} />
      </div>
      <ImageDetails image={image} />
    </div>
  );
};

export default ItemDetailPage;