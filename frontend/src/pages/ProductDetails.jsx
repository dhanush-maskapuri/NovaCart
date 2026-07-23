import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Product Details Skeleton</h1>
      <p className="text-gray-500">Viewing Product ID: {id}</p>
    </div>
  );
};

export default ProductDetails;
