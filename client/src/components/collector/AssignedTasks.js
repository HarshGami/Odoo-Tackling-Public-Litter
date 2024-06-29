import React, { useState, useEffect } from 'react';

const AssignedTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchData();
  }, [tasks]);

  const fetchData = async () => {
    try {
      let collectorEmail = localStorage.getItem('email');
      let queryParams = `?email=${collectorEmail}`;

      let status = 'Collector assigned';
      queryParams += `&status=${status}`;

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

  const handleMarkCompleted = async (taskId) => {
    try {
      const updatedTasks = tasks.map(task => {
        if (task._id === taskId) {
          return { ...task, status: 'Completed' };
        }
        return task;
      });
      setTasks(updatedTasks);

      await fetch(`http://localhost:5000/api/report/change_report_status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reportId: taskId,
          status: 'Completed',
        }),
      });
    } catch (error) {
      console.error('Error marking task as completed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <main className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map(task => (
            <div
              key={task._id}
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
              {task.status !== 'Completed' && (
                <button
                  onClick={() => handleMarkCompleted(task._id)}
                  className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2"
                >
                  Mark as Completed
                </button>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AssignedTasks;
