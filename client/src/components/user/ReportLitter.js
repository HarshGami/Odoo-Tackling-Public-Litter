import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import mapboxgl from "mapbox-gl";
import { useNavigate } from "react-router-dom";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoicGFydmFtYXBzIiwiYSI6ImNseHpvbW5lbzBkd3UyaHA4bmIxbno2eGIifQ._goQ1QeHwKrLM00O75aEVQ";

function ReportLitter() {
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        });
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 0],
      zoom: 2,
    });

    map.on("click", (e) => {
      setLocation({
        lng: e.lngLat.lng,
        lat: e.lngLat.lat,
      });
    });

    return () => map.remove();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location) {
      alert("Please select a location on the map.");
      return;
    }

    if (!description) {
      alert("Please enter a description.");
      return;
    }

    if (!photo) {
      alert("Please upload a photo.");
      return;
    }

    const formData = {
      userEmail: localStorage.getItem("email"),
      description: description,
      imageURL: "photo",
      latitude: location.lat,
      longitude: location.lng,
    };

    await fetch("http://localhost:5000/api/report/create_report", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert(data.message);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
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
            <form
              onSubmit={handleSubmit}
              className="bg-gray-200 p-6 rounded-lg shadow-lg max-w-lg mx-auto"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
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
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="photo"
                >
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
                <div
                  id="map"
                  className="w-full h-64 bg-gray-300 rounded-lg"
                  ref={mapContainerRef}
                ></div>
              </div>
              <div className="mb-4 pt-10">
                {location && (
                  <p className="text-gray-700">
                    Selected Location: {location.lat}, {location.lng}
                  </p>
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
    </div>
  );
}

export default ReportLitter;
