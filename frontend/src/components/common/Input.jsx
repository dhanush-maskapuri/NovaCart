import { forwardRef, useId } from 'react';

/**
 * Input Component
 * Accessible input and textarea component supporting icons, error messages, helper text, and dark mode theme.
 */
const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      isTextArea = false,
      rows = 4,
      className = '',
      containerClassName = '',
      id: customId,
      type = 'text',
      required = false,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = customId || generatedId;

    const baseInputStyles =
      'w-full rounded-lg border bg-white dark:bg-dark-card text-gray-900 dark:text-gray-100 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-800';

    const borderStyles = error
      ? 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500'
      : 'border-gray-300 dark:border-dark-border hover:border-gray-400 dark:hover:border-gray-600';

    const paddingStyles = `${leftIcon ? 'pl-10' : 'pl-3.5'} ${rightIcon ? 'pr-10' : 'pr-3.5'} py-2.5`;

    return (
      <div className={`flex flex-col gap-1.5 w-full ${containerClassName}`}>
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}

        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
              {leftIcon}
            </div>
          )}

          {isTextArea ? (
            <textarea
              ref={ref}
              id={inputId}
              rows={rows}
              aria-invalid={!!error}
              className={`${baseInputStyles} ${borderStyles} ${paddingStyles} ${className}`}
              {...props}
            />
          ) : (
            <input
              ref={ref}
              id={inputId}
              type={type}
              aria-invalid={!!error}
              className={`${baseInputStyles} ${borderStyles} ${paddingStyles} ${className}`}
              {...props}
            />
          )}

          {rightIcon && (
            <div className="absolute right-3 flex items-center text-gray-400 dark:text-gray-500">
              {rightIcon}
            </div>
          )}
        </div>

        {error ? (
          <span className="text-xs text-red-500 font-medium" role="alert">
            {error}
          </span>
        ) : helperText ? (
          <span className="text-xs text-gray-500 dark:text-gray-400">{helperText}</span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

