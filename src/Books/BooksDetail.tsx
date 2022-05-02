import React from "react";
import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

type Book = {
  title: string;
  url: string;
  detail: string;
  review: string;
};

const BooksDetail = () => {
  const { getAccessToken } = useAuth();
  const api_token = getAccessToken();
  const { id } = useParams();
  const bookDetailUrl = `https://api-for-missions-and-railways.herokuapp.com/books/${id}`;

  const [book, setBook] = useState<Book | null>(null);

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
  }, [id]);

  console.log(book);

  return (
    <>
      {book && (
        <div>
          <p>{book.title}</p>
          <p>{book.url}</p>
          <p>{book.detail}</p>
          <p>{book.review}</p>
          <p>{book.title}</p>
        </div>
      )}
    </>
  );
};

export { BooksDetail };
