import React, { useState, useEffect } from 'react';

const sampleCollectors = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
];

const sampleReports = [
  { id: 1, description: 'Overflowing trash bin on 5th Street', status: 'Open', location: '5th Street', date: '2024-06-20' },
  { id: 2, description: 'Litter on Main Street Park', status: 'Open', location: 'Main Street Park', date: '2024-06-21' },
];

const AssignTasks = () => {
  const [reports, setReports] = useState([]);
  const [collectors, setCollectors] = useState([]);
  const [assignments, setAssignments] = useState({});

  useEffect(() => {
    // Fetch reports and collectors from the backend
    // For now, use sampleReports and sampleCollectors as mock data
    setReports(sampleReports);
    setCollectors(sampleCollectors);
  }, []);

  const handleAssign = (reportId, collectorId) => {
    fetch('http://localhost:3000/assign-task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reportId, collectorId }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.id) {
          setReports(reports.filter(report => report.id !== reportId));
          setAssignments({ ...assignments, [reportId]: collectorId });
        }
      })
      .catch(error => {
        console.error('Error assigning task:', error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Assign Tasks</h1>
        </div>
      </header>
      <main className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map(report => (
            <div
              key={report.id}
              className="p-4 bg-white rounded shadow-md border-l-4 border-red-500"
            >
              <h3 className="text-xl font-bold mb-2">{report.description}</h3>
              <p><strong>Location:</strong> {report.location}</p>
              <p><strong>Date:</strong> {new Date(report.date).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {report.status}</p>
              <select
                value={assignments[report.id] || ''}
                onChange={e => handleAssign(report.id, e.target.value)}
                className="mt-2 py-1 px-2 border border-gray-400 rounded"
              >
                <option value="">Assign Collector</option>
                {collectors.map(collector => (
                  <option key={collector.id} value={collector.id}>{collector.name}</option>
                ))}
              </select>
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

export default AssignTasks;
