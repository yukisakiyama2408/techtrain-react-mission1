import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useAuth } from "./Contexts/AuthContext";

const BookIndex = () => {
  const { getAccessToken } = useAuth();
  const urlBooksApi =
    "https://api-for-missions-and-railways.herokuapp.com/books?offset=5";
  const api_token = getAccessToken();

  const [books, setBooks] = useState<Array<any>>([]);
  useEffect(() => {
    axios
      .get(urlBooksApi, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${api_token}`,
        },
        data: {},
      })
      .then((res) => {
        setBooks(res.data);
      });
  }, []);
  console.log(books);

  return (
    <>
      <div>
        <h2>本一覧</h2>
        <div>
          {books.map((data) => (
            <div key={data.id}>{data.title}</div>
          ))}
        </div>
      </div>
    </>
  );
};

export { BookIndex };
