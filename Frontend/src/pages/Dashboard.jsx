import React from "react";
import { Link } from "react-router-dom";



function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">


      <header className="flex justify-between items-center px-10 py-5 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-green-900">Chatly</h1>
        <nav className="space-x-4">
          <Link to={'/chatapp'} className="px-4 py-2 rounded border border-green-900 text-green-900 hover:bg-green-900 hover:text-white transition">
            Get Started
          </Link>
          {/* <button className="px-4 py-2 rounded bg-green-900 text-white hover:bg-green-800 transition">
            Sign up
          </button> */}
        </nav>
      </header>


      <section className="px-10 py-16 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-green-900">
            Deliver <span className="bg-green-200 px-2 rounded">the Perfect</span> 
            chat experience for your clients
          </h2>
          <p className="text-gray-600 text-lg">
            Engage your users with seamless messaging, real-time updates, and AI-powered features.
          </p>
          <div className="flex space-x-2">

            <Link to={'/chatapp'} className="px-6 py-2 rounded-r bg-green-900 text-white hover:bg-green-800 transition">
              Get Started
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 mt-10 flex justify-center md:mt-0">
          <img src="../iphone.png" alt="Chat dashboard" className="rounded-lg shadow-lg" />
        </div>
      </section>


      <section className="px-10 py-16 grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow">
          <h3 className="text-gray-500">Active Users</h3>
          <p className="text-2xl font-bold text-green-900">12.3k</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow">
          <h3 className="text-gray-500">Total Messages</h3>
          <p className="text-2xl font-bold text-green-900">45.6k</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow">
          <h3 className="text-gray-500">Online Users</h3>
          <p className="text-2xl font-bold text-green-900">1.2k</p>
        </div>
      </section>

      <footer className="px-10 py-6 text-center text-gray-500">
        © 2025 Chatly. All rights reserved.
      </footer>
    </div>
  );
}

export default Dashboard;
