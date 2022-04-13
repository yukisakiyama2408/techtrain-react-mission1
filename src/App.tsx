import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  RouteProps,
  Navigate,
} from "react-router-dom";
import Home from "./Home";
import React, { useContext } from "react";
import "./App.css";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { BookIndex } from "./BooksIndex";
import { AuthProvider } from "./Contexts/AuthContext";
import { RequireAuth } from "./Contexts/RequireAuth";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/book-index">Books</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/signup"
              element={
                <RequireAuth>
                  <Signup />
                </RequireAuth>
              }
            />
            <Route
              path="/login"
              element={
                <RequireAuth>
                  <Login />
                </RequireAuth>
              }
            />
            <Route
              path="/book-index"
              element={
                <RequireAuth>
                  <BookIndex />
                </RequireAuth>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default App;
