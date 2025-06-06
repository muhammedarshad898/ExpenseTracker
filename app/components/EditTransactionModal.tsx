'use client';

import { useState, useEffect } from 'react';
import { FaTimes, FaPenSquare } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

// Define the type for the transaction
interface Transaction {
  _id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
}

interface EditTransactionModalProps {
  Transactions: Transaction; // Use the defined type for Transactions
}

export default function EditTransactionModal({ Transactions }: EditTransactionModalProps) {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const [formData, setFormData] = useState<Transaction>({
    _id: '',
    title: '',
    amount: 0,
    type: 'income',
    date: '',
  });

  useEffect(() => {
    if (Transactions) {
      const formattedDate = Transactions.date?.split('T')[0]; // "2024-05-10"
      setFormData({
        ...Transactions,
        date: formattedDate || '',
      });
    }
  }, [Transactions]);

  const handleEditTransaction = async (id: string) => {
    const token = sessionStorage.getItem("token");

    try {
      const result = await axios.put(
        `/api/transactions/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(result);
      if (result.data.success) {
        toast.success("Transaction updated successfully");
        setTimeout(() => {
          handleClose();
        }, 600);
      } else {
        console.error(result.data.message);
        toast.error("Failed to update transaction");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update transaction");
    }
  };

  return (
    <>
      <div>
        <button onClick={handleShow} className="text-white px-4 py-2 rounded-xl" style={{ cursor: "pointer" }}>
          <FaPenSquare size={30} color='#3b82f6' className='hover:bg-#3b82f6-500 transition' />
        </button>
        {showModal && (
          <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative animate-fade-in">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                onClick={handleClose}
              >
                <FaTimes size={20} />
              </button>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Edit Transaction</h2>
              <form className="space-y-4">
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
                  onChange={(e) => setFormData({ ...formData, amount: +e.target.value })}
                />
                <select
                  name="type"
                  value={formData.type}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'income' | 'expense' })}
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  placeholder="Date"
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent form submission
                    handleEditTransaction(Transactions._id);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Update Transaction
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

