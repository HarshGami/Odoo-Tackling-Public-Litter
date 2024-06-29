import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CollectionSchedule = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    // Fetch the schedule data from the API
    fetch('/api/collection-schedule')
      .then((response) => response.json())
      .then((data) => setSchedule(data))
      .catch((error) => console.error('Error fetching schedule:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-gradient-to-r from-green-500 to-green-700 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Collection Schedule</h1>
        </div>
      </header>
      <main className="flex-grow">
        <section className="py-20 bg-white">
          <div className="container mx-auto text-center">
            <motion.h2 
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Garbage Collection Schedule
            </motion.h2>
            <motion.div 
              className="text-lg mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <p>Check the schedule for regular garbage collection in your area.</p>
            </motion.div>
            <div className="bg-gray-200 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
              {schedule.length > 0 ? (
                <ul>
                  {schedule.map((item) => (
                    <li key={item.id} className="mb-4">
                      <p className="text-lg font-semibold">{item.day}</p>
                      <p>{item.time}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Loading schedule...</p>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CollectionSchedule;
