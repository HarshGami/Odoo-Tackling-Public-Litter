import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import mapboxgl from 'mapbox-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken = 'mapbox_access_token';

function ReportLitter() {
  const [location, setLocation] = useState(null);
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 2,
    });

    map.on('click', (e) => {
      setLocation({
        lng: e.lngLat.lng,
        lat: e.lngLat.lat,
      });
    });

    return () => map.remove();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      location,
      description,
      photo,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-gradient-to-r from-green-500 to-green-700 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Report Litter</h1>
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
              Report Litter Hotspots
            </motion.h2>
            <form onSubmit={handleSubmit} className="bg-gray-200 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea 
                  id="description"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the litter hotspot"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">
                  Upload Photo
                </label>
                <input 
                  id="photo"
                  type="file"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Select Location
                </label>
                <div id="map" className="w-full h-64 bg-gray-300 rounded-lg" ref={mapContainerRef}></div>
              </div>
              <div className="mb-4">
                {location && (
                  <p className="text-gray-700">Selected Location: {location.lat}, {location.lng}</p>
                )}
              </div>
              <motion.button 
                className="bg-green-600 text-white py-2 px-4 rounded"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                type="submit"
              >
                Submit Report
              </motion.button>
            </form>
          </div>
        </section>
      </main>
      <footer className="bg-gradient-to-r from-green-500 to-green-700 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Garbage Management. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default ReportLitter;
