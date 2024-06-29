import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaUsers, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Home({ setIsAuth }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    async function verification() {
      const response = await fetch('http://localhost:5000/api/auth/verification', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      });

      return await response.json();
    }

    if (token) {
      const data = verification();

      if (!data.error) {
        setIsAuth(true);
        navigate("/");
      } else {
        alert(data.error);
        setIsAuth(false);
      }
    }
  }, []);

  
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="bg-hero-pattern bg-cover bg-center py-20 text-white">
          <div className="container mx-auto text-center">
            <motion.h2 
              className="text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Keep Your City Clean
            </motion.h2>
            <motion.p 
              className="text-xl mb-6"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Join us in our mission to manage urban waste effectively and keep our environment clean.
            </motion.p>
            <motion.button 
              className="bg-green-600 text-white py-2 px-4 rounded"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              Get Started
            </motion.button>
          </div>
        </section>

        <section id="about" className="py-20 bg-gradient-to-r from-gray-200 to-gray-300">
          <div className="container mx-auto text-center">
            <motion.h2 
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              About Us
            </motion.h2>
            <motion.p 
              className="text-lg mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              We are a dedicated team focused on improving urban cleanliness through efficient waste management solutions.
            </motion.p>
          </div>
        </section>

        <section id="problem" className="py-20 bg-white">
          <div className="container mx-auto text-center">
            <motion.h2 
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              The Problem
            </motion.h2>
            <motion.p 
              className="text-lg mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Public litter is a significant issue in urban areas, leading to environmental degradation and health hazards.
            </motion.p>
          </div>
        </section>

        <section id="solution" className="py-20 bg-gradient-to-r from-gray-200 to-gray-300">
          <div className="container mx-auto text-center">
            <motion.h2 
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Our Solution
            </motion.h2>
            <div className="flex justify-center">
              <motion.div 
                className="w-1/3 p-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                whileHover={{ scale: 1.1 }}
              >
                <FaMapMarkerAlt className="text-6xl text-green-600 mb-4 mx-auto" />
                <h3 className="text-2xl font-bold mb-2">Geolocation</h3>
                <p>Pinpoint litter hotspots with our geotagging feature for precise waste management.</p>
              </motion.div>
              <motion.div 
                className="w-1/3 p-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                whileHover={{ scale: 1.1 }}
              >
                <FaUsers className="text-6xl text-green-600 mb-4 mx-auto" />
                <h3 className="text-2xl font-bold mb-2">Community</h3>
                <p>Empower residents to report litter and request special pickups through our user-friendly platform.</p>
              </motion.div>
              <motion.div 
                className="w-1/3 p-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                whileHover={{ scale: 1.1 }}
              >
                <FaTrash className="text-6xl text-green-600 mb-4 mx-auto" />
                <h3 className="text-2xl font-bold mb-2">Efficiency</h3>
                <p>Optimize task assignments for garbage collectors with real-time tracking and notifications.</p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;