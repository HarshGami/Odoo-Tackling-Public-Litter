import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import CollectorTaskHistory from './collector/CollectorTaskHistory';
import CollectorSchedule from './collector/CollectorSchedule';
import AssignedTasks from './collector/AssignedTasks';
export default function DashboardCollector(){    

    return (
        <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Collector Dashboard</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <NavLink
                  to="/collector/dashboard"
                  activeClassName="font-bold"
                  className="text-white hover:text-gray-300"
                >
                  Tasks
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/collector/dashboard/schedule"
                  activeClassName="font-bold"
                  className="text-white hover:text-gray-300"
                >
                  Schedule
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/collector/dashboard/history"
                  activeClassName="font-bold"
                  className="text-white hover:text-gray-300"
                >
                  History
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto py-8">
        <Switch>
          <Route exact path="/collector/dashboard">
            <AssignedTasks />
          </Route>
          <Route path="/collector/dashboard/schedule">
            <CollectorSchedule />
          </Route>
          <Route path="/collector/dashboard/history">
            <CollectorTaskHistory />
          </Route>
        </Switch>
      </main>
      <footer className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Garbage Management. All rights reserved.</p>
        </div>
      </footer>
    </div>
    )
}