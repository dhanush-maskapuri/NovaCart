import ProductFilter from '../components/product/ProductFilter';
import ProductGrid from '../components/product/ProductGrid';

const Shop = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <aside className="md:col-span-1">
        <ProductFilter />
      </aside>
      <section className="md:col-span-3">
        <h2 className="text-2xl font-bold mb-6">Explore Products</h2>
        <ProductGrid products={[]} />
      </section>
    </div>
  );
};

export default Shop;
