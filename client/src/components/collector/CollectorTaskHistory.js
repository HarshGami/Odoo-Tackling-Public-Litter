import React, { useState, useEffect } from 'react';

const CollectorTaskHistory = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let collectorEmail = localStorage.getItem('email');
      let queryParams = `?email=${collectorEmail}`;

      
      let status = 'All';
      if (status !== 'All') {
        queryParams += `&status=${status}`;
      }

      const response = await fetch(`http://localhost:5000/api/report/reports_of_collector${queryParams}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setTasks(data.reports);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <main className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map(task => (
            <div
              key={task.id}
              className={`p-4 bg-white rounded shadow-md ${
                task.status === 'Open' ? 'border-l-4 border-red-500' :
                task.status === 'In Progress' ? 'border-l-4 border-yellow-500' :
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

export default CollectorTaskHistory;
