'use client';
import { useEffect, useState } from 'react';

import DashboardLayout from '../components/DashboardLayout';
import AddTransactionModal from '../components/AddTransactionModal';
import axios from 'axios';
import toast from 'react-hot-toast';
import EditTransactionModal from '../components/EditTransactionModal';
import { FaSignOutAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { FaTrash } from 'react-icons/fa';

export default function DashboardPage() {
 
  const [transactions, setTransactions] = useState([
   
  ]); 
  useEffect(() => {
    handleGetTransactions();
  }, []);
  const router=useRouter();
 const handleGetTransactions = async () => {
    try {
      const token=sessionStorage.getItem("token");
      const result = await axios.get("/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result);
      if (result.data.success) {
        setTransactions(result.data.transactions);
      } else {
        console.error(result.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteTransaction=async(id:string)=>{
    const token=sessionStorage.getItem("token");

    const result=await axios.delete(`/api/transactions/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    );
    console.log(result);
    if (result.data.success) {
      toast.success("Transaction deleted successfully");
      handleGetTransactions();
    } else {
      console.error(result.data.message);
      toast.error("Failed to delete transaction");
    }

  }
  const income = transactions
  .filter((t) => t.type === 'income')
  .reduce((sum, t) => sum + t.amount, 0);

const expense = transactions
  .filter((t) => t.type === 'expense')
  .reduce((sum, t) => sum + t.amount, 0);

const balance = income - expense;
const handleLogout=()=>{
  sessionStorage.removeItem("token");
  router.push("/login");
  toast.success("Logged out successfully");

}




 

  return (
    <DashboardLayout>
      {/* Button to trigger the modal */}
      <div className="flex justify-end mb-6">
        <AddTransactionModal  handlegettransactions={handleGetTransactions}  />
        <button className="flex items-center text-red-600 hover:text-red-800 ms-3" onClick={handleLogout} style={{cursor:"pointer"}}>
                    <FaSignOutAlt className="mr-2"  /> Logout
                  </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 bg-white rounded-xl shadow-md">
          <h3 className="text-gray-600 mb-2">Total Balance</h3>
          <p className="text-2xl font-bold text-indigo-600">₹{balance}</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md">
          <h3 className="text-gray-600 mb-2">Income</h3>
          <p className="text-xl text-green-600 font-semibold">{'₹'+income}</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md">
          <h3 className="text-gray-600 mb-2">Expenses</h3>
          <p className="text-xl text-red-500 font-semibold">{'₹'+expense}</p>
        </div>
      </div>

      {/* Recent Transactions */}
    
{
  transactions.length>0?
  <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Recent Transactions</h2>

        <ul className="space-y-3 text-sm text-gray-600">
          {
            transactions.map((item:{title: string;
  amount: number;
  type: string;
  date: string;
  _id:string
})=>(
                <li className="flex justify-between items-center border-b pb-2">
              <div className="flex flex-col">
                <span>{item.title}</span>
                <span {...{ className: item.type === 'expense' ? 'text-red-500' : 'text-green-600' }}>


               {item.type==='expense'?'-':'+'}   {item.amount}
                 
                </span>
              </div>

              <div className="flex space-x-2">
                {/* Edit Button */}
                <EditTransactionModal Transactions={item}></EditTransactionModal>
              

                {/* Delete Button */}
                <button
                  
                  className="text-red-500 hover:text-red-700 text-sm font-medium" style={{ cursor: 'pointer' }}
                  onClick={()=>handleDeleteTransaction(item._id)}
                >
                 <FaTrash size={25}></FaTrash>
                </button>
              </div>
            </li>
       
             
            ))
          }
       
          
        </ul>
      </div>
      :
     <h2 className='text-lg font-semibold mb-4 text-gray-700 text-center'>No Transactions Available</h2>
}
      
      



      {/* Modals */}
     

     
     
      
    </DashboardLayout>
  );
}

