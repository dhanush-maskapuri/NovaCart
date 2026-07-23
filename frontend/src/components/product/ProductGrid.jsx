import ProductCard from './ProductCard';

const ProductGrid = ({ products = [] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.length > 0 ? (
        products.map((product, index) => <ProductCard key={product._id || index} product={product} />)
      ) : (
        <p className="text-gray-500 col-span-full">No products found.</p>
      )}
    </div>
  );
};

export default ProductGrid;
