



//src/app/items/page.js'use client';
'use client'; // Esta línea debe estar en la primera línea del archivo

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ItemForm from '../../components/itemForm';
import ItemList from '../../components/itemList'; // Asegúrate de importar ItemList aquí si lo usas

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filterInStock, setFilterInStock] = useState('all'); // 'all', 'available', 'notAvailable'
  const [filterCategory, setFilterCategory] = useState('all'); // 'all', 'indoor', 'outdoor'
  const [filteredItems, setFilteredItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/items', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }

        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError('Failed to fetch items');
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [items, filterInStock, filterCategory]);

  const filterItems = () => {
    let filtered = [...items];

    if (filterInStock !== 'all') {
      filtered = filtered.filter(item =>
        filterInStock === 'available' ? item.inStock : !item.inStock
      );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(item => item.category === filterCategory);
    }

    setFilteredItems(filtered);
  };

  const handleCreateOrUpdate = async (item) => {
    try {
      const method = editingItem ? 'PUT' : 'POST';
      const endpoint = `/api/items${editingItem ? `/${editingItem.id}` : ''}`;

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(item),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(editingItem ? 'Item updated successfully!' : 'Item created successfully!');
        setEditingItem(null);
        setItems((prevItems) =>
          editingItem
            ? prevItems.map((i) => (i.id === data.id ? data : i))
            : [...prevItems, data]
        );
      } else {
        const errorData = await response.json();
        setError(`Operation failed: ${errorData.message}`);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        setSuccess('Item deleted successfully!');
      } else {
        const errorData = await response.json();
        setError(`Deletion failed: ${errorData.message}`);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login'); // Redirigir a la página de login
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex justify-between items-center p-4 bg-indigo-800 text-white">
        <h1 className="text-2xl font-bold">Items</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 p-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <div className="flex flex-1 flex-col p-4">
        {success && <p className="text-green-500 mb-4">{success}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <ItemForm onSubmit={handleCreateOrUpdate} item={editingItem} />

        {/* Filtros */}
         <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0 mt-8 mb-8">
          <select
            value={filterInStock}
            onChange={(e) => setFilterInStock(e.target.value)}
            className="p-2 border rounded mb-2 md:mb-0"
          >
            <option value="all">All Items</option>
            <option value="available">Available</option>
            <option value="notAvailable">Not Available</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">All Categories</option>
            <option value="indoor">Indoor</option>
            <option value="outdoor">Outdoor</option>
          </select>
        </div>

        <ItemList items={filteredItems} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default ItemsPage;