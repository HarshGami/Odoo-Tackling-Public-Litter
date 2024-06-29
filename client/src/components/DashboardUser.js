import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaHistory } from 'react-icons/fa';
import { motion } from 'framer-motion';

function DashboardUser() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-500 to-green-700 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Resident Dashboard</h1>
          <nav>
            <a href="#schedule" className="mx-2">Collection Schedule</a>
            <a href="#report" className="mx-2">Report Litter</a>
            <a href="#report-history" className="mx-2">Report History</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Collection Schedule Section */}
        <section id="schedule" className="py-20 bg-white">
          <div className="container mx-auto text-center">
            <motion.h2 
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Collection Schedule
            </motion.h2>
            <motion.div 
              className="text-lg mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <FaCalendarAlt className="text-6xl text-green-600 mb-4 mx-auto" />
              <p>View the schedule for regular garbage collection in your area.</p>
            </motion.div>
            <motion.button 
              className="bg-green-600 text-white py-2 px-4 rounded"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              View Schedule
            </motion.button>
          </div>
        </section>

        {/* Report Litter Section */}
        <section id="report" className="py-20 bg-gray-200">
          <div className="container mx-auto text-center">
            <motion.h2 
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Report Litter
            </motion.h2>
            <motion.div 
              className="text-lg mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <FaMapMarkerAlt className="text-6xl text-green-600 mb-4 mx-auto" />
              <p>Report litter hotspots by uploading photos and descriptions with geotagging.</p>
            </motion.div>
            <motion.button 
              className="bg-green-600 text-white py-2 px-4 rounded"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              Report Litter
            </motion.button>
          </div>
        </section>

        {/* Special Pickup Section */}
        <section id="report-history" className="py-20 bg-white">
          <div className="container mx-auto text-center">
            <motion.h2 
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Report History
            </motion.h2>
            <motion.div 
              className="text-lg mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <FaHistory className="text-4xl text-blue-600 mb-4 mx-auto" />
              <p>Track all your Reports till now with their status</p>
            </motion.div>
            <motion.button 
              className="bg-green-600 text-white py-2 px-4 rounded"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              Request Pickup
            </motion.button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-500 to-green-700 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Garbage Management. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default DashboardUser;
