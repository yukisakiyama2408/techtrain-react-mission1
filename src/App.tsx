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

const HomeRoutes = () => {
  const { accessToken } = useAuth();
  const isSignedIn = accessToken != null;

  // if (isSignedIn) {
  //   return <Route path="/" element={<Home />} />;
  // } else {
  //   return <Route path="/" element={<Login />} />;
  // }
  return (
    <>
      <Routes>
        <Route path="/" element={isSignedIn ? <BookIndex /> : <Login />} />
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
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <div>
        <Router>
          <HomeRoutes />
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;
