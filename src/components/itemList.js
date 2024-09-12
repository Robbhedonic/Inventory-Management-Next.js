//src/components/itemList.js


import React, { useState } from 'react';

const capitalizeFirstWord = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const ItemList = ({ items, onEdit, onDelete }) => {
  const [expandedItemId, setExpandedItemId] = useState(null);

  if (!items || items.length === 0) {
    return <p>No items available</p>;
  }

  const handleToggleExpand = (itemId) => {
    setExpandedItemId(expandedItemId === itemId ? null : itemId);
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="card relative p-6 border-2 rounded-lg shadow-lg bg-white max-w-xs" 
        >
          <div className="inner-border p-4">
            <div className="flex justify-center items-center mb-4">
              <img
                src={item.imageUrl} // Suponiendo que 'imageUrl' es la propiedad de imagen
                alt={item.name}
                className="w-38 h-32 object-cover rounded-lg" // Tamaño y forma de la imagen
              />
            </div>
            <h2 className="text-lg font-semibold text-black">{item.name}</h2>
            <div className="border-b-2 my-2"></div> {/* Separador entre la imagen y la descripción */}
            
            <p className="text-black text-sm">
              {expandedItemId === item.id
                ? capitalizeFirstWord(item.description)
                : `${capitalizeFirstWord(item.description).slice(0, 50)}...`}
            </p>
            {item.description.length > 50 && (
              <span
                className="text-blue-600 cursor-pointer hover:underline block mt-2"
                onClick={() => handleToggleExpand(item.id)}
              >
                {expandedItemId === item.id ? 'Show less' : 'Show more'}
              </span>
            )}
            <div className="border-b-2 my-2"></div> {/* Separador debajo de show more */}
            
            <p className="text-black"><strong>Quantity:</strong> {item.quantity}</p>
            <div className="border-b-2 my-2"></div> {/* Separador debajo de quantity */}
            <p className="text-black"><strong>In Stock:</strong> {item.inStock ? 'Available' : 'Not Available'}</p>
            <div className="border-b-2 my-2"></div> {/* Separador debajo de in stock */}
            <p className="text-black"><strong>Category:</strong> {capitalizeFirstWord(item.category)}</p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => onEdit(item)}
                className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;

