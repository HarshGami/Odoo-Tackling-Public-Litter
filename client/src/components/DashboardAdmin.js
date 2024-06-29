import React from 'react';
import { FaUser, FaTasks, FaChartLine } from 'react-icons/fa';
import { motion } from 'framer-motion';



export default function DashboardAdmin(){    

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <nav>
            <Link to="/manage-users" className="mx-2">Manage Users</Link>
            <Link to="/assign-tasks" className="mx-2">Assign Tasks</Link>
            <Link to="/monitor-progress" className="mx-2">Monitor Progress</Link>
          </nav>
        </div>
      </header>
      <main className="flex-grow">
        <section id="manage-users" className="py-20 bg-white">
          <div className="container mx-auto text-center">
            <motion.h2 
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Manage Users
            </motion.h2>
            <motion.div 
              className="text-lg mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <FaUser className="text-6xl text-blue-600 mb-4 mx-auto" />
              <p>Manage residents, garbage collectors, and administrators.</p>
            </motion.div>
            <Link to="/manage-users">
              <motion.button 
                className="bg-blue-600 text-white py-2 px-4 rounded"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                Manage Users
              </motion.button>
            </Link>
          </div>
        </section>

        <section id="assign-tasks" className="py-20 bg-gray-200">
          <div className="container mx-auto text-center">
            <motion.h2 
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Assign Tasks
            </motion.h2>
            <motion.div 
              className="text-lg mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <FaTasks className="text-6xl text-blue-600 mb-4 mx-auto" />
              <p>Assign litter cleanup tasks to garbage collectors.</p>
            </motion.div>
            <Link to="/assign-tasks">
              <motion.button 
                className="bg-blue-600 text-white py-2 px-4 rounded"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                Assign Tasks
              </motion.button>
            </Link>
          </div>
        </section>

        <section id="monitor-progress" className="py-20 bg-white">
          <div className="container mx-auto text-center">
            <motion.h2 
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Monitor Progress
            </motion.h2>
            <motion.div 
              className="text-lg mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <FaChartLine className="text-6xl text-blue-600 mb-4 mx-auto" />
              <p>Monitor the progress of ongoing cleanup tasks in real-time.</p>
            </motion.div>
            <Link to="/monitor-progress">
              <motion.button 
                className="bg-blue-600 text-white py-2 px-4 rounded"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                Monitor Progress
              </motion.button>
            </Link>
          </div>
        </section>
      </main>
      <footer className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Garbage Management. All rights reserved.</p>
        </div>
      </footer>
    </div>
    )
}