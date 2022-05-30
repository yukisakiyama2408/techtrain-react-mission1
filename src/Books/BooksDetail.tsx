import React from "react";
import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Edit } from "@material-ui/icons";

type Book = {
  title: string;
  url: string;
  detail: string;
  review: string;
  reviewer: string;
  isMine: true;
};

const BooksDetail = () => {
  const { accessToken: api_token } = useAuth();
  const navigate = useNavigate();

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
    const confirm = window.confirm("本当にレビュー削除しますか");
    if (confirm) {
      return axios
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
    } else {
      return navigate("/book-index");
    }
  };

  return (
    <>
      {book && (
        <div className="review-box">
          <div className="book-review">
            <a className="review-url" href={book.url}>
              <h2 className="review-title">{book.title}</h2>{" "}
            </a>
            <h3>書籍の説明文：</h3>
            <p>{book.detail}</p>
            <h3>レビュー：</h3>
            <p>{book.review}</p>
            <p>投稿者：{book.reviewer}</p>
            {book.isMine && (
              <div>
                <Button
                  variant="contained"
                  component={Link}
                  to="/edit"
                  startIcon={<EditIcon />}
                  title="レビューを編集する"
                >
                  編集
                </Button>
                <Button
                  variant="contained"
                  onClick={DeleteReview}
                  startIcon={<DeleteIcon />}
                  title="削除する"
                >
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
