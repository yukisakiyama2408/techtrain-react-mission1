import { useAuth } from "./AuthContext";
import { useNavigate, Link } from "react-router-dom";

const AuthStatus = () => {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return (
      <header>
        <Link to="/login">Login</Link>{" "}
      </header>
    );
  }

  return <p>Welcome {auth.user}! </p>;
};
