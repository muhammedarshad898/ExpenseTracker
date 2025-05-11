


import { FaChartPie, FaWallet, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';

export default function Sidebar() {
  

  return (
    <aside className="w-64 bg-white shadow-md hidden md:block">
      <div className="h-full flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-indigo-600 p-6">TrackIt</h2>
          <nav className="space-y-4 px-6 text-gray-700">
            <Link href="/dashboard" className="flex items-center space-x-3 hover:text-indigo-600">
              <FaChartPie /> <span>Dashboard</span>
            </Link>
            <Link href="/wallet" className="flex items-center space-x-3 hover:text-indigo-600">
              <FaWallet /> <span>Wallet</span>
            </Link>
          </nav>
        </div>
        <div className="p-6">
          <button className="flex items-center text-red-600 hover:text-red-800">
            <FaSignOutAlt className="mr-2"  /> Logout
          </button>
        </div>
      </div>
    </aside>
  );
}

