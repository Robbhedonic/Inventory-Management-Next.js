


//src/components/ItemForm.js


'use client';

import { useState, useEffect } from 'react';

const ItemForm = ({ onSubmit, item }) => {
  const [name, setName] = useState(item ? item.name : '');
  const [description, setDescription] = useState(item ? item.description : '');
  const [quantity, setQuantity] = useState(item ? item.quantity : '');
  const [inStock, setInStock] = useState(item ? item.inStock : 'Available');
  const [category, setCategory] = useState(item ? item.category : 'indoor');
  const [imageUrl, setImageUrl] = useState(item ? item.imageUrl : ''); // Nuevo campo para la URL de la imagen

  useEffect(() => {
    if (item) {
      setName(item.name);
      setDescription(item.description);
      setQuantity(item.quantity);
      setInStock(item.inStock ? 'Available' : 'Not Available');
      setCategory(item.category);
      setImageUrl(item.imageUrl); // Actualiza el campo de imagen
    }
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: item ? item.id : null,
      name,
      description,
      quantity: parseInt(quantity, 10),
      inStock: inStock === 'Available',
      category,
      imageUrl, // Envía la URL de la imagen al backend
    }).then(() => {
      // Restablece el formulario después de enviar
      setName('');
      setDescription('');
      setQuantity('');
      setInStock('Available');
      setCategory('indoor');
      setImageUrl('');
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-300 rounded-lg shadow-lg p-4">
      <h2 className="text-xl text-black font-semibold mb-4">{item ? 'Edit Item' : 'Create Item'}</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="p-2 border border-gray-300 rounded mb-4 w-full capitalize"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="p-2 border border-gray-300 rounded mb-4 w-full"
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
        className="p-2 border border-gray-300 rounded mb-4 w-full"
        required
      />
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL"
        className="p-2 border border-gray-300 rounded mb-4 w-full" // Campo para la URL de la imagen
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 border border-gray-300 rounded mb-4 w-full"
      >
        <option value="indoor">Indoor</option>
        <option value="outdoor">Outdoor</option>
      </select>
      <select
        value={inStock}
        onChange={(e) => setInStock(e.target.value)}
        className="p-2 border border-black-300 rounded mb-4 w-full"
      >
        <option value="Available">Available</option>
        <option value="Not Available">Not Available</option>
      </select>
      <button type="submit" className="bg-indigo-800 text-white px-4 py-2 rounded hover:bg-blue-600">
        {item ? 'Update Item' : 'Create Item'}
      </button>
    </form>
  );
};

export default ItemForm;