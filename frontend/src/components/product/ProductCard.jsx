import Card from '../common/Card';
import { formatCurrency } from '../../utils/formatters';

const ProductCard = ({ product }) => {
  return (
    <Card className="p-4 flex flex-col justify-between hover:shadow-lg transition-shadow">
      <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
        <span className="text-xs text-gray-400">Product Image Placeholder</span>
      </div>
      <div>
        <h3 className="font-semibold text-lg">{product?.name || 'Sample Product'}</h3>
        <p className="text-primary-600 dark:text-primary-400 font-bold mt-1">
          {formatCurrency(product?.price || 999)}
        </p>
      </div>
    </Card>
  );
};

export default ProductCard;
