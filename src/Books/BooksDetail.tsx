import React from "react";
import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
//import { DeleteReview } from "../Books/BookDelete";

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

  const DeleteReview = () => {
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

  return (
    <>
      {book && (
        <div>
          <div>
            <h2>{book.title}</h2>
            <a href={book.url}>{book.url}</a>
            <p>{book.detail}</p>
            <p>{book.review}</p>
            <p>{book.title}</p>
          </div>
          <div>
            <button onClick={DeleteReview}>削除</button>
          </div>
        </div>
      )}
    </>
  );
};

export { BooksDetail };
