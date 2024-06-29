import React, { useState, useEffect } from 'react';

const sampleSchedules = [
  { id: 1, date: '2024-07-01', type: 'Regular', description: 'Scheduled regular trash pickup' },
  { id: 2, date: '2024-07-05', type: 'Special', description: 'Scheduled special pickup for hazardous waste' },
  { id: 3, date: '2024-07-08', type: 'Regular', description: 'Scheduled regular trash pickup' },
];

const CollectorSchedule = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    // Fetch collector's scheduled tasks from backend (mocked data for demonstration)
    setSchedules(sampleSchedules);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Schedule</h1>
        </div>
      </header>
      <main className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {schedules.map(schedule => (
            <div
              key={schedule.id}
              className="p-4 bg-white rounded shadow-md border-l-4 border-blue-500"
            >
              <h3 className="text-xl font-bold mb-2">{schedule.description}</h3>
              <p><strong>Date:</strong> {new Date(schedule.date).toLocaleDateString()}</p>
              <p><strong>Type:</strong> {schedule.type}</p>
            </div>
          ))}
        </div>
      </main>
      <footer className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Garbage Management. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CollectorSchedule;
