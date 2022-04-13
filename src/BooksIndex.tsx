import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

const BookIndex = () => {
  const urlBooksApi =
    "https://api-for-missions-and-railways.herokuapp.com/books?offset=5";
  const api_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDk2NjAyMjksImlhdCI6IjIwMjItMDQtMTBUMDY6NTc6MDkuNDA1MDc4ODE2WiIsInN1YiI6IjU0NTQ2NTU3MzU0IiwidXNlcl9pZCI6IjAwNzRhMjkzLTdhZjEtNDBkZC1hNDVlLTliODYyYWZkYWZjOSJ9.SPbh0uIdeNNepd6h1GjheAUccYE26dGCzXXyHN7YbVA";
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
