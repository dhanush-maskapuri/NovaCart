/**
 * SectionHeading Component
 * Reusable header component for page sections with subtitle tag, main title, description, and alignment options.
 */
const SectionHeading = ({
  tagline,
  title,
  description,
  align = 'left',
  className = '',
}) => {
  const alignmentStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  return (
    <div className={`flex flex-col gap-1.5 max-w-2xl ${alignmentStyles[align] || alignmentStyles.left} ${className}`}>
      {tagline && (
        <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
          {tagline}
        </span>
      )}
      {title && (
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-1">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
