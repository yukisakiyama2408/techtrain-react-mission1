import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const DeleteReview = () => {
  const navigate = useNavigate();
  const { accessToken: api_token } = useAuth();
  const { id } = useParams();
  const bookDetailUrl = `https://api-for-missions-and-railways.herokuapp.com/books/${id}`;

  axios
    .delete(bookDetailUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${api_token}`,
      },
      data: {},
    })
    .then((res) => {
      alert("削除しました!");
      console.log(res.data);
      navigate("/book-index");
    });

  return navigate("/book-index");
};

export { DeleteReview };
