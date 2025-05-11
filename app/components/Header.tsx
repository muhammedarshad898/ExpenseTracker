'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          TrackIt
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 items-center text-gray-700 font-medium">
          <Link href="/" className="hover:text-indigo-600 transition">Home</Link>
          <Link href="#features" className="hover:text-indigo-600 transition">Features</Link>
          <Link href="#pricing" className="hover:text-indigo-600 transition">Pricing</Link>
          <Link href="/login" className="hover:text-indigo-600 transition">Login</Link>
          <Link
            href="/signup"
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
          >
            Sign Up
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <FaTimes className="text-2xl text-indigo-600" />
            ) : (
              <FaBars className="text-2xl text-indigo-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-white px-6 pb-4 space-y-3 font-medium text-gray-700">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="#features" onClick={() => setIsOpen(false)}>Features</Link>
          <Link href="#pricing" onClick={() => setIsOpen(false)}>Pricing</Link>
          <Link href="/login" onClick={() => setIsOpen(false)}>Login</Link>
          <Link
            href="/signup"
            onClick={() => setIsOpen(false)}
            className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-xl mt-2"
          >
            Sign Up
          </Link>
        </nav>
      )}
    </header>
  );
}
