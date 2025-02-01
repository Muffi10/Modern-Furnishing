// LazyImage.js
import React, { Suspense, useState } from 'react';

const LazyImage = ({ src, alt, className }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <Suspense fallback={<div className="bg-gray-200 h-full w-full rounded animate-pulse" />}>
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'hidden' : ''}`}
        onLoad={handleLoad}
      />
      {isLoading && <div className="bg-gray-200 h-full w-full rounded animate-pulse" />}
    </Suspense>
  );
};

export default LazyImage;
