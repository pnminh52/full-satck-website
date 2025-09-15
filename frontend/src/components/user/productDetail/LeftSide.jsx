import React from 'react'

const LeftSide = ({selectedImage, galleryImages, product, setSelectedImage}) => {
  return (
    <div>
        <div className="flex-1">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-[400px] object-cover rounded"
            />
          ) : (
            <div className="w-full h-[400px] bg-gray-200 rounded flex items-center justify-center">
              No Image
            </div>
          )}

          {/* Gallery */}
          <div className="flex gap-2 mt-4 overflow-x-auto">
  {galleryImages.map((img, idx) => (
    <img
      key={idx}
      src={img}
      alt={`${product.name} ${idx + 1}`}
      className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
        selectedImage === img ? "border-blue-500" : "border-gray-200"
      }`}
      onClick={() => setSelectedImage(img)} // click đổi ảnh chính
    />
  ))}
</div>

        </div>
    </div>
  )
}

export default LeftSide