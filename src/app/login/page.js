

// src/app/login/page.js

'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importa useRouter de next/navigation
import Header from '../../components/header'; 
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter(); // Inicializa el hook useRouter

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setSuccess('Login successful!');
        setEmail('');
        setPassword('');
        router.push('/items'); // Redirige al usuario a la página de ítems
      } else {
        const errorData = await response.json();
        setError(`Login failed: ${errorData.message}`);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-green-900">
      <Header />
      <div className="flex items-center justify-center flex-1 bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
          <h1 className="text-xl font-semibold mb-4">Login</h1>
          {success && <p className="text-green-500 mb-4">{success}</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit" className="w-full p-3 bg-indigo-800 text-white rounded hover:bg-blue-600">Login</button>
          </form>
          <p className="mt-4">
            Don't have an account? <Link href="/register" className="text-blue-500 hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}