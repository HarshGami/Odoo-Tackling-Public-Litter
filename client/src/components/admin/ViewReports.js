import React, { useState, useEffect } from 'react';

const sampleReports = [
  { id: 1, description: 'Overflowing trash bin on 5th Street', status: 'Open', location: '5th Street', date: '2024-06-20' },
  { id: 2, description: 'Litter on Main Street Park', status: 'Collector Assigned', location: 'Main Street Park', date: '2024-06-21' },
  { id: 3, description: 'Garbage bags left on sidewalk', status: 'Completed', location: '7th Avenue', date: '2024-06-22' },
];

const ViewReports = () => {
  const [reports, setReports] = useState([]);
  const [sortOrder, setSortOrder] = useState('date');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    // Fetch reports from the backend
    // For now, use sampleReports as mock data
    setReports(sampleReports);
  }, []);

  const sortedReports = [...reports].sort((a, b) => {
    if (sortOrder === 'date') {
      return new Date(a.date) - new Date(b.date);
    } else if (sortOrder === 'description') {
      return a.description.localeCompare(b.description);
    } else {
      return a.status.localeCompare(b.status);
    }
  });

  const filteredReports = sortedReports.filter(report => {
    if (filterStatus === 'All') return true;
    return report.status === filterStatus;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">View Reports</h1>
        </div>
      </header>
      <main className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <label htmlFor="sortOrder" className="mr-2">Sort By:</label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
              className="py-1 px-2 border border-gray-400 rounded"
            >
              <option value="date">Date</option>
              <option value="description">Description</option>
              <option value="status">Status</option>
            </select>
          </div>
          <div>
            <label htmlFor="filterStatus" className="mr-2">Filter By Status:</label>
            <select
              id="filterStatus"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="py-1 px-2 border border-gray-400 rounded"
            >
              <option value="All">All</option>
              <option value="Open">Open</option>
              <option value="Collector Assigned">Collector Assigned</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReports.map(report => (
            <div
              key={report.id}
              className={`p-4 bg-white rounded shadow-md ${
                report.status === 'Open' ? 'border-l-4 border-red-500' :
                report.status === 'Collector Assigned' ? 'border-l-4 border-yellow-500' :
                'border-l-4 border-green-500'
              }`}
            >
              <h3 className="text-xl font-bold mb-2">{report.description}</h3>
              <p><strong>Location:</strong> {report.location}</p>
              <p><strong>Date:</strong> {new Date(report.date).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {report.status}</p>
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

export default ViewReports;
