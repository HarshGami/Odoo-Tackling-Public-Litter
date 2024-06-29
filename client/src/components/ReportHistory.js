import React, { useState } from 'react';

const reportData = [
  {
    id: 1,
    description: 'Overflowing trash bin on 5th Street',
    collector: 'John Doe',
    status: 'Completed',
  },
  {
    id: 2,
    description: 'Litter on Main Street Park',
    collector: '',
    status: 'Open',
  },
  {
    id: 3,
    description: 'Garbage bags left on sidewalk',
    collector: 'Jane Smith',
    status: 'Collector Assigned',
  },
];

const ReportHistory = () => {
  const [sortOrder, setSortOrder] = useState('description');
  const [filterStatus, setFilterStatus] = useState('All');

  const sortedData = [...reportData].sort((a, b) => {
    if (sortOrder === 'description') {
      return a.description.localeCompare(b.description);
    } else {
      return a.status.localeCompare(b.status);
    }
  });

  const filteredData = sortedData.filter(report => {
    if (filterStatus === 'All') return true;
    return report.status === filterStatus;
  });

  const getStatusColor = status => {
    switch (status) {
      case 'Open':
        return 'bg-red-200';
      case 'Collector Assigned':
        return 'bg-yellow-200';
      case 'Completed':
        return 'bg-green-200';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Report History</h1>
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
          {filteredData.map(report => (
            <div
              key={report.id}
              className={`p-4 rounded shadow-md ${getStatusColor(report.status)}`}
            >
              <h3 className="text-xl font-bold mb-2">{report.description}</h3>
              <p className="mb-2"><strong>Collector:</strong> {report.collector || 'Not assigned'}</p>
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

export default ReportHistory;
