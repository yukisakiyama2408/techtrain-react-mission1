import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import "./CSS/App.css";
import { Signup } from "./Users/Signup";
import { Login } from "./Users/Login";
import { BookIndex } from "./Books/BooksIndex";
import { UserUpdate } from "./Users/userUpdate";
import { NotFound } from "./NotFound";
import { AuthProvider, useAuth } from "./Contexts/AuthContext";
import { BookNew } from "./Books/BooksNew";
import { BooksDetail } from "./Books/BooksDetail";
import { Profile } from "./Users/Profile";
import { BookEdit } from "./Books/BookEdit";

const App = () => {
  // const { accessToken } = useAuth();
  // const isSignedIn = accessToken != null;
  return (
    <AuthProvider>
      <Router>
        <div>
          <Menu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user-update" element={<UserUpdate />} />
            <Route path="/book-index" element={<BookIndex />} />
            <Route path="/new" element={<BookNew />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/detail/:id" element={<BooksDetail />} />
            <Route path="/edit/:id" element={<BookEdit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

const Menu = () => {
  const { accessToken } = useAuth();

  const isSignedIn = accessToken != null;
  return (
    <header>
      <div className="header0">
        <Link to="/">Home</Link>
      </div>
    </header>
  );
};

export default App;
