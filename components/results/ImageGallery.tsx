import React from "react";

interface ImageGalleryProps {
  images: string[];
  isMobile?: boolean;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  isMobile = false,
}) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-lg font-semibold mb-3 text-blue-600 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        Imágenes Relevantes
      </h2>
      <div
        className={`grid ${
          isMobile ? "grid-cols-2 gap-3" : "grid-cols-3 gap-4"
        }`}
      >
        {isMobile
          ? images.slice(0, 4).map((image, i) => renderImage(image, i))
          : images.map((image, i) => renderImage(image, i))}
      </div>
    </div>
  );
};

// Función auxiliar para renderizar cada imagen
const renderImage = (image: string, index: number) => (
  <div
    key={index}
    className="rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
    style={{ height: "48" }}
  >
    <img
      src={image}
      alt={`Imagen ${index + 1}`}
      className="w-full h-full object-cover"
    />
  </div>
);

export default ImageGallery;
