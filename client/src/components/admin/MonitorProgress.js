import React, { useState, useEffect } from 'react';

const MonitorProgress = () => {
  const [progress, setProgress] = useState([]);
  const [sortOrder, setSortOrder] = useState('status');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/report/get_all_reports');
        if (!response.ok) {
          throw new Error('Failed to fetch progress data');
        }
        const data = await response.json();

        setProgress(data.reports);
      } catch (error) {
        console.error('Error fetching progress data:', error);
      }
    };

    fetchProgress();
  }, []);

  const sortedProgress = [...progress].sort((a, b) => {
    if (sortOrder === 'description') {
      return a.description.localeCompare(b.description);
    } else {
      return a.status.localeCompare(b.status);
    }
  });

  const filteredProgress = sortedProgress.filter(task => {
    if (filterStatus === 'All') return true;
    return task.status === filterStatus;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4">
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
              <option value="Collector assigned">Collector Assigned</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProgress.map(task => (
            <div
              key={task._id}
              className={`p-4 bg-white rounded shadow-md ${
                task.status === 'Open' ? 'border-l-4 border-red-500' :
                task.status === 'Collector Assigned' ? 'border-l-4 border-yellow-500' :
                'border-l-4 border-green-500'
              }`}
            >
              <h3 className="text-xl font-bold mb-2">{task.description}</h3>
              <p><strong>Reporter Name:</strong> {task.userName}</p>
              <p><strong>Reporter Email:</strong> {task.userEmail}</p>
              <p><strong>Longitude:</strong> {task.longitude}</p>
              <p><strong>Latitude:</strong> {task.latitude}</p>
              <p><strong>Status:</strong> {task.status}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MonitorProgress;
