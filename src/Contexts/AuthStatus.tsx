import { useAuth } from "./AuthContext";
import { useNavigate, Link } from "react-router-dom";

// const AuthStatus = () => {
//   let auth = useAuth();
//   let navigate = useNavigate();

//   if (!auth.getAccessToken()) {
//     return (
//       <header>
//         <Link to="/login">Login</Link>{" "}
//       </header>
//     );
//   }

//   return <p>Welcome {auth.getAccessToken()}! </p>;
// };
