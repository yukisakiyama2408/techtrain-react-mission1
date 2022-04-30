import React from "react";
import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BooksDetail = () => {
  const { getAccessToken } = useAuth();
  const api_token = getAccessToken();
  const { id } = useParams();

  const bookDetailUrl =
    "api-for-missions-and-railways.herokuapp.com//books/{id}";

  const [bookId, setBookId] = useState(" ");
  const [bookTitle, setBookTitle] = useState(" ");
  const [bookUrl, setBookUrl] = useState(" ");
  const [bookDetail, setBookDetail] = useState(" ");
  const [bookreview, setBookReview] = useState(" ");

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
        setBookId(res.data.id);
        setBookTitle(res.data.title);
        setBookUrl(res.data.url);
        setBookDetail(res.data.detail);
        setBookReview(res.data.review);
      });
  }, []);

  return <div></div>;
};
