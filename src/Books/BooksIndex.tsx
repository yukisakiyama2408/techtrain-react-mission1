import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";

const BookIndex = () => {
  const navigate = useNavigate();
  const { getAccessToken, signout } = useAuth();
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

  const SignOut = () => {
    signout();
    return navigate("/");
  };

  return (
    <>
      <div>
        {isSignedIn && (
          <>
            <header>ようこそ{User}</header>
            <header>
              <Button
                variant="contained"
                onClick={() => {
                  SignOut();
                }}
              >
                Sign Out
              </Button>
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
              <div key={data.id}>
                <h2>{data.title}</h2>
                <a href={data.url}>{data.url}</a>
                <p>{data.detail}</p>
                <p>{data.review}</p>
                <div>
                  <Link to={`/detail/${data.id}`}>詳細</Link>
                </div>
                <div>
                  <Link to={`/edit/${data.id}`}>編集</Link>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export { BookIndex };
