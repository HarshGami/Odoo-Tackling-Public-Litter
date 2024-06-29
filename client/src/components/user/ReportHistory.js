import React, { useState, useEffect } from 'react';

const ReportHistory = () => {
  const [reportData, setReportData] = useState([]);
  const [sortOrder, setSortOrder] = useState('description');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const email = localStorage.getItem('email');
        let apiUrl = `http://localhost:5000/api/report/reports_of_user?email=${email}`;
        
        if (filterStatus !== 'All') {
          apiUrl += `&status=${filterStatus}`;
        }
        
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        setReportData(data.reports); 
      } catch (error) {
        console.error('Error fetching report data:', error);
      }
    };

    fetchReportData();
  }, [filterStatus]); 

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
              <p className="mb-2"><strong>Collector Name:</strong> {report.collectorName || 'Not assigned'}</p>
              <p className="mb-2"><strong>Collector Email:</strong> {report.collectorEmail || 'Not assigned'}</p>
              <p><strong>Status:</strong> {report.status}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ReportHistory;
