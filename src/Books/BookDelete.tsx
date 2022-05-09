import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";
import { useParams } from "react-router-dom";

const DeleteReview = () => {
  const { getAccessToken } = useAuth();
  const api_token = getAccessToken();
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
    });
};

export { DeleteReview };
