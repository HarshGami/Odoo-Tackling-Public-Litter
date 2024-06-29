import Register from "./components/Register";
import DashboardCollector from "./components/DashboardCollector";
import DashboardUser from "./components/DashboardUser";
import DashboardAdmin from "./components/DashboardAdmin";
import NavBar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  return (
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
                      <DashboardUser
                        isAuth={isAuth}
                        setIsAuth={setIsAuth}
                      />
                    }
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
                    element={<DashboardAdmin isAuth={isAuth} setIsAuth={setIsAuth} />}
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
  );
}

export default App;
