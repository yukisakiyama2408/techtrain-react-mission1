import React, { useEffect, useState } from "react";
import axios from "axios";

type Book = {
  Bearer: string;
};

const BookIndex = () => {
  const urlBooksApi =
    "https://api-for-missions-and-railways.herokuapp.com/books?offset=5";
  const api_token = "react-book-api";
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios
      .get(urlBooksApi, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${api_token}`,
        },
      })
      .then((res) => {
        setBooks(res.data);
      });
  }, []);
  return (
    <div>
      <h2>本一覧</h2>
      <div>
        {books.map((data) => (
          <div key={data}>aaa</div>
        ))}
      </div>
    </div>
  );
};

export { BookIndex };
