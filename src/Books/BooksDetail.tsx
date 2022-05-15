import React from "react";
import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";

//import { DeleteReview } from "../Books/BookDelete";

type Book = {
  title: string;
  url: string;
  detail: string;
  review: string;
  reviewer: string;
  isMine: true;
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
        <div className="review-box">
          <div className="book-review">
            <h2 className="review-title">{book.title}</h2>
            <a className="review-url" href={book.url}>
              {book.url}
            </a>
            <p>書籍の説明文：{book.detail}</p>
            <p>レビュー：{book.review}</p>
            <p>投稿者：{book.reviewer}</p>
            {book.isMine && (
              <div>
                <Button variant="contained" onClick={DeleteReview}>
                  削除
                </Button>
              </div>
            )}
            <p>
              <Link to="/book-index">戻る</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export { BooksDetail };
