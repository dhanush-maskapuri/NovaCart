import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ProductGallery Component
 * High resolution image gallery with thumbnail carousel and zoom preview.
 */
const ProductGallery = ({ images = [], name = 'Product Image', discount }) => {
  const imageList = images.length > 0 ? images : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'];
  const [selectedImage, setSelectedImage] = useState(imageList[0]);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main Image Display Box */}
      <div
        className="relative aspect-square w-full rounded-3xl bg-gray-100 dark:bg-dark-card border border-gray-200 dark:border-dark-border overflow-hidden cursor-zoom-in group"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedImage}
            src={selectedImage}
            alt={name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: isZoomed ? 1.15 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover object-center transition-transform duration-300"
          />
        </AnimatePresence>

        {discount && (
          <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            -{discount}% OFF
          </span>
        )}

        <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          Hover to zoom
        </div>
      </div>

      {/* Thumbnails Row */}
      {imageList.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {imageList.map((imgUrl, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(imgUrl)}
              className={`relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                selectedImage === imgUrl
                  ? 'border-primary-600 dark:border-primary-400 ring-2 ring-primary-500/30'
                  : 'border-gray-200 dark:border-dark-border opacity-70 hover:opacity-100'
              }`}
            >
              <img src={imgUrl} alt={`${name} thumb ${index}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
