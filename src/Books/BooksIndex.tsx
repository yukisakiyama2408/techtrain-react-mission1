import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Toolbar from "@mui/material/Toolbar";
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
      {isSignedIn && (
        <>
          <header className="index-header">
            <div className="index-title">
              <h2>本一覧</h2>
              <LogoutIcon
                onClick={() => {
                  SignOut();
                }}
                className="logout-btn"
              />
              <a href="/profile" className="move-profile">
                <AccountCircleIcon />
              </a>
              <p className="user-name">{User}</p>
            </div>
            {/* <div className="logout-btn">
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
            {/* </div>
            <div className="move-profile">
              <a href="/profile">
                <AccountCircleIcon />
              </a>
              <p>{User}</p>
            </div> */}
          </header>
        </>
      )}
      {!isSignedIn && (
        <header>
          <div>
            <Link to="/login">ログイン</Link>
          </div>
        </header>
      )}
      <div>
        <div>
          <a href="/new">
            <AddCircleSharp />
          </a>
          <p>レビューを登録する</p>
        </div>
        <div>
          {books.map((data) => {
            return (
              <div className="card-box">
                <div className="index-card">
                  <Card sx={{ maxWidth: 370 }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        <a href={data.url}> {data.title}</a>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {data.detail}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {data.reveiew}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {data.reviewer}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        component={Link}
                        to={`/detail/${data.id}`}
                        className="detail-btn"
                      >
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>

        <Table className="book-table">
          {/* <TableHead>
            <TableRow>
              <TableCell>タイトル</TableCell>

              <TableCell>本の詳細</TableCell>
              <TableCell>レビュー</TableCell>
              <TableCell>投稿者</TableCell>
              <TableCell>アクション</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* perPageごとにユーザーをスライス */}
          {/* {books.map((data) => {
              return (
                <TableRow key={data.id}>
                  <TableCell>
                    <a href={data.url}>{data.title}</a>
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
          </TableBody> */}
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
