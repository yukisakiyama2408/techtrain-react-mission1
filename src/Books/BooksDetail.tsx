import React from "react";
import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { MenuAppBar } from "./BookIndexHeader";
import { Button } from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import { DeleteReviewAlert } from "./BookDelete";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type Book = {
  id: string;
  title: string;
  url: string;
  detail: string;
  review: string;
  reviewer: string;
  isMine: true;
};

const BooksDetail = () => {
  const { accessToken: api_token } = useAuth();

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

  return (
    <>
      <MenuAppBar />
      {book && (
        <div className="detail-card-box">
          <Card className="detail-card">
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              ></Typography>
              <Typography variant="h4" component="div">
                <a
                  className="review-url"
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {book.title}
                </a>
              </Typography>
              <div>
                <div className="detail-section">
                  {/* <Typography variant="h6">この本について：</Typography> */}
                  <Typography variant="body1">{book.detail}</Typography>
                </div>
                <div className="review-section">
                  <Typography variant="h6">
                    {book.reviewer}さんのコメント：
                  </Typography>
                  <Typography variant="body1">{book.review}</Typography>
                </div>
              </div>
            </CardContent>
            <CardActions>
              <Button
                component={Link}
                to="/book-index"
                className="detail-edit-btn"
              >
                <ArrowBackIcon />
              </Button>
              {book.isMine && (
                <>
                  <Button
                    component={Link}
                    to={`/edit/${book.id}`}
                    className="detail-edit-btn"
                  >
                    <EditIcon />
                  </Button>
                  <DeleteReviewAlert />
                </>
              )}
            </CardActions>
          </Card>
        </div>
      )}
    </>
  );
};

export { BooksDetail };
