'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import toast from 'react-hot-toast'


export default function Login() {
  const [user,setUser]=useState({
    email:"",
    password:""
  }); 
  const router=useRouter();
  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault();
    try{
      const response=await axios.post("/api/login",user);
      if(response.data.success){
        toast.success("Login successful");
        sessionStorage.setItem("token",response.data.token);
        sessionStorage.setItem("username",response.data.user.username);
        router.push("/");
      }
    }
    catch(error:any){
      toast.error("Login failed");
  }
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="rounded-lg w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your email"
                onChange={(e)=>setUser({...user,email:e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="rounded-lg w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your password"
                onChange={(e)=>setUser({...user,password:e.target.value})}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
        
        <div className="text-center">
          <Link 
            href="/signup" 
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            New User? Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
