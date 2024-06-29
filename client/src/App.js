import Register from "./components/Register";
import DashboardCollector from "./components/DashboardCollector";
import DashboardUser from "./components/user/DashboardUser";
import DashboardAdmin from "./components/admin/DashboardAdmin";
import NavBar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import ReportLitter from "./components/user/ReportLitter";
import ReportHistory from "./components/user/ReportHistory";
import AsignTasks from "./components/admin/AsignTasks";
import MonitorProgrss from "./components/admin/MonitorProgress";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  return (
    <>
      <div className="App">
        {isAuth ? (
          <>
            {role === "1" ? (
              <>
                <Router>
                  <NavBar isAuth={isAuth} setIsAuth={setIsAuth} role={role} />
                  <Routes>
                    <Route
                      exact
                      path="*"
                      element={
                        <DashboardUser isAuth={isAuth} setIsAuth={setIsAuth} />
                      }
                    ></Route>
                    <Route
                      exact
                      path="/report_form"
                      element={<ReportLitter />}
                    ></Route>
                    <Route
                      exact
                      path="/report_history"
                      element={<ReportHistory />}
                    ></Route>
                  </Routes>
                </Router>
              </>
            ) : role === "2" ? (
              <Router>
                <NavBar isAuth={isAuth} setIsAuth={setIsAuth} role={role} />
                <Routes>
                  <Route
                    exact
                    path="*"
                    element={
                      <DashboardCollector
                        isAuth={isAuth}
                        setIsAuth={setIsAuth}
                      />
                    }
                  ></Route>
                </Routes>
              </Router>
            ) : (
              <>
                <Router>
                  <NavBar isAuth={isAuth} setIsAuth={setIsAuth} role={role} />
                  <Routes>
                    <Route
                      exact
                      path="*"
                      element={
                        <DashboardAdmin isAuth={isAuth} setIsAuth={setIsAuth} />
                      }
                    ></Route>
                    <Route
                      exact
                      path="/assigne_task"
                      element={
                        <AsignTasks />
                      }
                    ></Route>
                    <Route
                      exact
                      path="/task_status"
                      element={
                        <MonitorProgrss />
                      }
                    ></Route>
                  </Routes>
                </Router>
              </>
            )}
          </>
        ) : (
          <>
            <Router>
              <NavBar isAuth={isAuth} setIsAuth={setIsAuth} role={role} />
              {token && <Register setIsAuth={setIsAuth} />}
              <Routes>
                <Route
                  exact
                  path="*"
                  element={<Home setIsAuth={setIsAuth} />}
                ></Route>
                <Route
                  exact
                  path="/register"
                  element={<Register setIsAuth={setIsAuth} />}
                ></Route>
              </Routes>
            </Router>
          </>
        )}
      </div>
      <footer className="bg-gradient-to-r from-green-500 to-green-700 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Garbage Management. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
