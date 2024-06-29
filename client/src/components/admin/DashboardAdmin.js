import React from "react";
import { FaUser, FaTasks, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

export default function DashboardAdmin() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-grow">
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
              <motion.button
                className="bg-blue-600 text-white py-2 px-4 rounded"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <Link to="/assigne_task">Assign Tasks</Link>
              </motion.button>
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
              <motion.button
                className="bg-blue-600 text-white py-2 px-4 rounded"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <Link to="/task_status">Monitor Progress</Link>
              </motion.button>
          </div>
        </section>
      </main>
    </div>
  );
}
