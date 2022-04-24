import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Home from "./Home";
import "./App.css";
import { Signup } from "./Users/Signup";
import { Login } from "./Users/Login";
import { BookIndex } from "./Books/BooksIndex";
import { UserUpdate } from "./Users/userUpdate";
import { AuthProvider, useAuth } from "./Contexts/AuthContext";
import { BookNew } from "./Books/BooksNew";
import { RequireAuth } from "./Contexts/RequireAuth";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Menu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user-update" element={<UserUpdate />} />
            <Route
              path="/book-index"
              element={
                //<RequireAuth>
                <BookIndex />
                //</RequireAuth>
              }
            />
            <Route path="/new" element={<BookNew />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

const Menu = () => {
  const { getAccessToken } = useAuth();

  const isSignedIn = Boolean(getAccessToken());
  return (
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
        {!isSignedIn && (
          <>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
        <li>
          <Link to="/book-index">Books</Link>
        </li>
        <li>
          <Link to="/new">Book Registration</Link>
        </li>
      </ul>
    </nav>
  );
};

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default App;
