/**
 * Skeleton Component
 * Customizable shimmer placeholder component for content loading states.
 */
const Skeleton = ({
  variant = 'text',
  width,
  height,
  className = '',
  count = 1,
}) => {
  const baseStyles = 'bg-gray-200 dark:bg-dark-card animate-pulse rounded';

  const variants = {
    text: 'h-4 w-full rounded',
    title: 'h-7 w-3/4 rounded-md',
    circular: 'rounded-full',
    rectangular: 'w-full h-48 rounded-xl',
    card: 'w-full h-64 rounded-xl',
  };

  const style = {
    width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
  };

  const items = Array.from({ length: count });

  return (
    <>
      {items.map((_, index) => (
        <div
          key={index}
          className={`${baseStyles} ${variants[variant] || variants.text} ${className}`}
          style={style}
          aria-hidden="true"
        />
      ))}
    </>
  );
};

export default Skeleton;
