'use client';

import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

// Define prop types
interface AddTransactionModalProps {
  handlegettransactions: () => void;
}

export default function AddTransactionModal({ handlegettransactions }: AddTransactionModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: '',
    date: '',
  });

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token');
      const result = await axios.post('/api/Addtransaction', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.data.success) {
        toast.success('Transaction added successfully');
        setShowModal(false);
        setFormData({
          title: '',
          amount: '',
          type: '',
          date: '',
        });
        handlegettransactions();
      } else {
        toast.error('Failed to add transaction');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
        style={{ cursor: 'pointer' }}
      >
        Add +
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
            >
              <FaTimes size={20} />
            </button>

            <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Transaction</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                value={formData.title}
                placeholder="Title"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />

              <input
                type="number"
                name="amount"
                value={formData.amount}
                placeholder="Amount"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />

              <select
                name="type"
                value={formData.type}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="">Select type</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>

              <input
                type="date"
                name="date"
                value={formData.date}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition"
              >
                Add Transaction
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
