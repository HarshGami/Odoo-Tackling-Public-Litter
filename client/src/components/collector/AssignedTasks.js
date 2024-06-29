import React, { useState, useEffect } from 'react';

const sampleTasks = [
  { id: 1, description: 'Overflowing trash bin on 5th Street', status: 'Open', location: '5th Street', date: '2024-06-20', image: 'https://via.placeholder.com/150', coordinates: { lng: -122.4194, lat: 37.7749 } },
  { id: 2, description: 'Litter on Main Street Park', status: 'Open', location: 'Main Street Park', date: '2024-06-21', image: 'https://via.placeholder.com/150', coordinates: { lng: -122.4305, lat: 37.7749 } },
];



const AssignedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [sortOrder, setSortOrder] = useState('date');
  const [filterStatus, setFilterStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  useEffect(() => {
    // Fetch tasks from the backend
    // For now, use sampleTasks as mock data
    setTasks(sampleTasks);
  }, []);

  const handleComplete = (taskId) => {
    fetch(`http://localhost:3000/complete-task/${taskId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.id) {
          setTasks(tasks.filter(task => task.id !== taskId));
        }
      })
      .catch(error => {
        console.error('Error completing task:', error);
      });
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortOrder === 'date') {
      return new Date(a.date) - new Date(b.date);
    } else if (sortOrder === 'description') {
      return a.description.localeCompare(b.description);
    } else {
      return a.status.localeCompare(b.status);
    }
  });

  const filteredTasks = sortedTasks.filter(task => {
    if (filterStatus === 'All') return true;
    return task.status === filterStatus;
  });

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const handleDirections = (coordinates) => {
    window.open(`https://www.mapbox.com/directions?lng=${coordinates.lng}&lat=${coordinates.lat}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Assigned Tasks</h1>
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
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentTasks.map(task => (
            <div
              key={task.id}
              className={`p-4 bg-white rounded shadow-md ${
                task.status === 'Open' ? 'border-l-4 border-red-500' :
                task.status === 'In Progress' ? 'border-l-4 border-yellow-500' :
                'border-l-4 border-green-500'
              }`}
            >
              <h3 className="text-xl font-bold mb-2">{task.description}</h3>
              <img src={task.image} alt="Task" className="mb-2 rounded-lg" />
              <p><strong>Location:</strong> {task.location}</p>
              <p><strong>Date:</strong> {new Date(task.date).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => handleDirections(task.coordinates)}
                  className="mr-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  View Directions
                </button>
                {task.status !== 'Completed' && (
                  <button
                    onClick={() => handleComplete(task.id)}
                    className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Mark as Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="py-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="py-2 px-4">{currentPage} / {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className="py-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
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

export default AssignedTasks;
