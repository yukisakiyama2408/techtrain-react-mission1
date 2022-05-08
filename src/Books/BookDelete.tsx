import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

type Book = {
  title: string;
  url: string;
  detail: string;
  review: string;
};

const DeleteReview = () => {
  const { getAccessToken } = useAuth();
  const api_token = getAccessToken();
  const { id } = useParams();
  const bookDetailUrl = `https://api-for-missions-and-railways.herokuapp.com/books/${id}`;

  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    axios
      .delete(bookDetailUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${api_token}`,
        },
        data: {},
      })
      .then((res) => {
        setBook(null);
      });
  }, [id]);

  console.log(book);
};

export { DeleteReview };
