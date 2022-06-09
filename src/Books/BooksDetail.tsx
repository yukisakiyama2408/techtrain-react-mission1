import React from "react";
import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MenuAppBar } from "./BookIndexHeader";
import { Button } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DeleteReviewAlert } from "./BookDelete";
import Box from "@mui/material/Box";
import Container from "@material-ui/core/Container";
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
              <Typography variant="h5" component="div">
                <a className="review-url" href={book.url}>
                  {book.title}
                </a>
              </Typography>

              <Typography variant="body2">{book.detail}</Typography>
              <Typography variant="h6"> {book.reviewer}'s review </Typography>
              <Typography variant="body2">{book.review}</Typography>
            </CardContent>
            <CardActions>
              {book.isMine && (
                <>
                  {" "}
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
              <Button
                component={Link}
                to="/book-index"
                className="detail-edit-btn"
              >
                <ArrowBackIcon />
              </Button>
            </CardActions>
          </Card>
        </div>
      )}
    </>
  );
};

export { BooksDetail };
