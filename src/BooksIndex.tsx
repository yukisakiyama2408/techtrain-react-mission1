import React, { useEffect, useState } from "react";
import axios from "axios";

const BookIndex = () => {
  const urlBooksApi =
    "https://api-for-missions-and-railways.herokuapp.com/books";
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios.get(urlBooksApi).then((res) => {
      setBooks(res.data);
    });
  }, []);
  return (
    <div>
      <h2>本一覧</h2>
    </div>
  );
};

export { BookIndex };
