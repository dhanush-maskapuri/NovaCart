const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-dark-card rounded-xl p-6 max-w-md w-full mx-4 shadow-xl border border-gray-200 dark:border-dark-border">
        {children}
      </div>
    </div>
  );
};

export default Modal;
