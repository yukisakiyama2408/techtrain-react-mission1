import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import {
  Button,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
  TablePagination,
} from "@material-ui/core";
import { isMinusToken } from "typescript";
import AddCircleSharp from "@mui/icons-material/AddCircleSharp";

const BookIndex = () => {
  const navigate = useNavigate();
  const { accessToken, signout } = useAuth();
  const api_token = accessToken;
  const urlBooksApi =
    "https://api-for-missions-and-railways.herokuapp.com/books";
  const [books, setBooks] = useState<Array<any>>([]);
  const [page, setPage] = useState(0);
  const perPage = 10;

  useEffect(() => {
    axios
      .get(`${urlBooksApi}?offset=${page * 10}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${api_token}`,
        },
        data: {},
      })
      .then((res) => {
        setBooks(res.data);
      });
  }, [page]);

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
  const isSignedIn = accessToken != null;
  const User = user;

  const SignOut = () => {
    signout();
    return navigate("/");
  };

  return (
    <div>
      <header>
        {isSignedIn && (
          <>
            <h2>本一覧</h2>
            <div className="logout-btn">
              <LogoutIcon
                onClick={() => {
                  SignOut();
                }}
              />
              {/* <Button
                variant="contained"
                onClick={() => {
                  SignOut();
                }}
              >
                Sign Out
              </Button> */}
            </div>
            <div className="move-profile">
              <a href="/profile">
                <AccountCircleIcon />
              </a>
              <p>{User}</p>
            </div>
          </>
        )}
        {!isSignedIn && (
          <div>
            <Link to="/login">ログイン</Link>
          </div>
        )}
      </header>
      <div>
        <div>
          <a href="/new">
            <AddCircleSharp />
          </a>
          <p>レビューを登録する</p>
        </div>
        <Table className="book-table">
          <TableHead>
            <TableRow>
              <TableCell>タイトル</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>本の詳細</TableCell>
              <TableCell>レビュー</TableCell>
              <TableCell>投稿者</TableCell>
              <TableCell>アクション</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* perPageごとにユーザーをスライス */}
            {books.map((data) => {
              return (
                <TableRow key={data.id}>
                  <TableCell>{data.title}</TableCell>
                  <TableCell>
                    <a href={data.url}>URL</a>
                  </TableCell>
                  <TableCell>{data.detail}</TableCell>
                  <TableCell>{data.review}</TableCell>
                  <TableCell>{data.reviewer}</TableCell>
                  <TableCell>
                    <Link to={`/detail/${data.id}`}>詳細</Link>
                    {data.isMine && <Link to={`/edit/${data.id}`}>編集</Link>}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TablePagination
              count={100}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
              rowsPerPageOptions={[]}
              rowsPerPage={perPage}
            ></TablePagination>
          </TableFooter>
        </Table>

        {/* <div>
          {books.map((data) => (
            <>
              <div key={data.id}>
                <h2>{data.title}</h2>
                <a href={data.url}>{data.url}</a>
                <p>{data.detail}</p>
                <p>{data.review}</p>
                <p>{data.reviewer}</p>
                <div>
                  <Link to={`/detail/${data.id}`}>詳細</Link>
                </div>
                {data.isMine && (
                  <div>
                    <Link to={`/edit/${data.id}`}>編集</Link>
                  </div>
                )}
              </div>
            </>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export { BookIndex };
