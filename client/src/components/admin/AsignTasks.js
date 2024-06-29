import React, { useState, useEffect } from 'react';

const AssignTasks = () => {
  const [reports, setReports] = useState([]);
  const [collectors, setCollectors] = useState([]);
  const [assignments, setAssignments] = useState({});

  useEffect(() => {
    const fetchCollectors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user/get_collector_list');
        if (!response.ok) {
          throw new Error('Failed to fetch collectors');
        }
        const data = await response.json();

        setCollectors(data.collectorList);
      } catch (error) {
        console.error('Error fetching collectors:', error);
      }
    };

    const fetchReports = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/report/get_all_reports?status=Open');
        if (!response.ok) {
          throw new Error('Failed to fetch reports');
        }
        const data = await response.json();

        setReports(data.reports);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchCollectors();
    fetchReports();
  }, [assignments]);

  const handleAssign = (reportId, collectorId) => {
    const formData = {
      reportId: reportId,
      collectorEmail: collectorId,
    };

    fetch('http://localhost:5000/api/report/assign_collector_to_report', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.updatedReport) {
          setReports(reports.filter(report => report.id !== reportId));
          setAssignments({ ...assignments, [reportId]: collectorId });
        } else {
          console.error('Assignment failed:', data.message);
        }
      })
      .catch(error => {
        console.error('Error assigning task:', error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <main className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map(report => (
            <div
              key={report._id}
              className="p-4 bg-white rounded shadow-md border-l-4 border-red-500"
            >
              <h3 className="text-xl font-bold mb-2">{report.description}</h3>
              <p><strong>Reporter Name:</strong> {report.userName}</p>
              <p><strong>Reporter Email:</strong> {report.userEmail}</p>
              <p><strong>Longitude:</strong> {report.longitude}</p>
              <p><strong>Latitude:</strong> {report.latitude}</p>
              <p><strong>Status:</strong> {report.status}</p>
              <select
                value={assignments[report._id] || ''}
                onChange={e => handleAssign(report._id, e.target.value)}
                className="mt-2 py-1 px-2 border border-gray-400 rounded"
              >
                <option value="">Assign Collector</option>
                {collectors.map(collector => (
                  <option key={collector.email} value={collector.email}>{collector.name}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AssignTasks;
