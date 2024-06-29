import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// const sampleTasks = [
//   { id: 1, description: 'Overflowing trash bin on 5th Street', status: 'Completed', assignedDate: '2024-06-20', completedDate: '2024-06-21' },
//   { id: 2, description: 'Litter on Main Street Park', status: 'Open', assignedDate: '2024-06-21' },
//   { id: 3, description: 'Broken bins on 3rd Avenue', status: 'In Progress', assignedDate: '2024-06-22' },
// ];

const CollectorTaskHistory = () => {
  const [tasks, setTasks] = useState([]);



  const handleMarkCompleted = (taskId) => {
    // Simulated function to mark task as completed
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: 'Completed', completedDate: new Date().toISOString() };
      }
      return task;
    });
    setTasks(updatedTasks);
    // Call backend API to update task status here in actual implementation
  };

  async function fetchData() {
    // const sellerId = "64d9bc1985a03fe1d1aba5db";
    try {
      // const config = {
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      // };
      let collectorEmail = localStorage.getItem('email');
      const product = await fetch(
        `http://localhost:5000/api/seller/allproducts/${collectorEmail}`
      );
      // console.log(product.data);
      setTasks(product);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Task History</h1>
        </div>
      </header>
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
              <p><strong>Status:</strong> {task.status}</p>
              <p><strong>Assigned Date:</strong> {new Date(task.assignedDate).toLocaleDateString()}</p>
              {task.status === 'Completed' && (
                <p><strong>Completed Date:</strong> {new Date(task.completedDate).toLocaleDateString()}</p>
              )}
              <button
                onClick={() => handleMarkCompleted(task.id)}
                className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 mt-2"
                disabled={task.status === 'Completed'}
              >
                Mark as Completed
              </button>
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

export default CollectorTaskHistory;
