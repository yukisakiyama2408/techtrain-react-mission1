import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { reviewDelete } from "./BookDelete";

const BookIndex = () => {
  const navigate = useNavigate();
  const { getAccessToken, signout, getUserName } = useAuth();
  const urlBooksApi =
    "https://api-for-missions-and-railways.herokuapp.com/books?offset=10";
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

  const [user, setUser] = useState("");
  const userNameApi =
    "https://api-for-missions-and-railways.herokuapp.com/users";

  useEffect(() => {
    axios
      .get(userNameApi, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${api_token}`,
        },
        data: {},
      })
      .then((res) => {
        setUser(res.data.name);
      });
  }, []);

  console.log(books);
  const isSignedIn = Boolean(getAccessToken());
  const User = user;

  return (
    <>
      <div>
        {isSignedIn && (
          <>
            <header>ようこそ{User}</header>
            <header>
              <button
                onClick={() => {
                  signout();
                }}
              >
                Sign Out
              </button>
            </header>
            <header>
              <Link to="/profile">ユーザー情報を編集する</Link>
            </header>
          </>
        )}
        {!isSignedIn && (
          <header>
            <Link to="/login">Login</Link>
          </header>
        )}
        <header>
          <Link to="/new">書籍を登録する</Link>
        </header>
      </div>
      <div>
        <h2>本一覧</h2>
        <div>
          {books.map((data) => (
            <>
              <div key={data.id}>{data.title}</div>
              <a key={data.id} href={data.url}>
                {data.url}
              </a>
              <div key={data.id}>{data.detail}</div>
              <div key={data.id}>{data.review}</div>
              <Link to={`/detail/${data.id}`}>詳細</Link>
              <Link to={`/edit/${data.id}`}>編集</Link>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export { BookIndex };
