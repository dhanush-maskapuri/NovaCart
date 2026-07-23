const CartItem = ({ item }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-border">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
        <div>
          <h4 className="font-semibold text-sm">{item?.name || 'Sample Product'}</h4>
          <p className="text-xs text-gray-500">Qty: {item?.quantity || 1}</p>
        </div>
      </div>
      <span className="font-bold text-sm">₹{item?.price || 0}</span>
    </div>
  );
};

export default CartItem;
