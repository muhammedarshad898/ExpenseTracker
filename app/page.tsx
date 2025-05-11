// pages/index.tsx (or app/page.tsx for App Router)
'use client';
import Head from 'next/head';
import { FaChartLine, FaWallet, FaMobileAlt } from 'react-icons/fa';
import Header from './components/Header';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
   const token = sessionStorage.getItem('token');
    if (token) {
      router.push('/Dashboard'); // Logged in
    } else {
      router.push('/login'); // Not logged in
    }
  };
 

  return (
    <>
    <Header />
      <Head>
        <title>TrackIt | Smart Expense Tracker</title>
        <meta name="description" content="Track your expenses smartly and easily with TrackIt." />
      </Head>

      <main className="min-h-screen bg-white-50 text-gray-800">
        {/* Hero Section */}
        <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-16 py-20">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Take Control of Your <span className="text-indigo-600">Expenses</span>
            </h1>
            <p className="text-lg mb-8 text-gray-600">
              TrackIt helps you monitor, categorize, and manage your money with ease. Get insights, stay on budget, and achieve financial freedom.
            </p>
            <button onClick={handleGetStarted} style={{ cursor: 'pointer' }} className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition">
              Get Started – It's Free
            </button>
          </div>
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
            <img
              src="https://static.vecteezy.com/system/resources/previews/019/857/522/original/3d-illustration-of-financial-and-payment-concept-with-calculator-money-coin-and-credit-card-free-png.png"
              alt="Finance illustration"
              className="w-full"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-16 px-6 md:px-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why TrackIt?</h2>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <FaChartLine className="text-indigo-600 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-time Analytics</h3>
              <p className="text-gray-600">Visualize your spending with smart charts and graphs.</p>
            </div>
            <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <FaWallet className="text-indigo-600 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Budget Management</h3>
              <p className="text-gray-600">Set goals and stick to them with daily budget tracking.</p>
            </div>
            <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <FaMobileAlt className="text-indigo-600 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Mobile Friendly</h3>
              <p className="text-gray-600">Access and update your expenses from anywhere.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-100 text-center py-6">
          <p className="text-sm text-gray-500">© 2025 TrackIt. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}
