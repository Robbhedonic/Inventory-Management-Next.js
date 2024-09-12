
//src/components/header.js


'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-indigo-800 p-4 text-white rounded-bl-full rounded-br-full">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Inventory Management</h1>
        <nav className="flex flex-grow justify-end">
          <ul className="flex space-x-10 max-w-[40%]"> {/* Espaciado entre enlaces y ancho máximo */}
            <li>
              <Link href="/" className="font-bold hover:underline">Home</Link>
            </li>
            <li>
              <Link href="/login" className="font-bold hover:underline">Login</Link>
            </li>
            <li>
              <Link href="/register" className="font-bold hover:underline">Register</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}