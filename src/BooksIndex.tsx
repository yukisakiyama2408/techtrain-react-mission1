import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useAuth } from "./Contexts/AuthContext";
import { Link, Navigate } from "react-router-dom";

const BookIndex = () => {
  const { getAccessToken, signout } = useAuth();
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
  const isSignedIn = Boolean(getAccessToken());

  return (
    <>
      <div>
        {isSignedIn && (
          <>
            <header>aaa</header>
            <header>
              <button
                onClick={() => {
                  signout();
                }}
              >
                Sign Out
              </button>
              {!isSignedIn && <Navigate to={"/login"} />}
            </header>
          </>
        )}
        {!isSignedIn && (
          <header>
            <Link to="/login">Login</Link>
          </header>
        )}
      </div>
      <div>
        <h2>本一覧</h2>
        <div>
          console.log(data);
          {books.map((data) => (
            <div key={data.id}>{data.title}</div>
          ))}
        </div>
      </div>
    </>
  );
};

export { BookIndex };
