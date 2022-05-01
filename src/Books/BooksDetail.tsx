import React from "react";
import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BooksDetail = () => {
  const { getAccessToken } = useAuth();
  const api_token = getAccessToken();
  const { bookId } = useParams();
  const bookDetailUrl = `api-for-missions-and-railways.herokuapp.com//books/${bookId}`;

  const [book, setBook] = useState(" ");

  useEffect(() => {
    axios
      .get(bookDetailUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${api_token}`,
        },
        data: {},
      })
      .then((res) => {
        setBook(res.data);
      });
  }, [bookId]);

  console.log(book);

  return (
    <>
      <div>
        <p>book.title</p>
      </div>
      ;
    </>
  );
};

export { BooksDetail };
