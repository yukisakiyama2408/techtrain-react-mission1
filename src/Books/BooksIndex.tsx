import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Container } from "@material-ui/core";
import { CardActionArea } from "@mui/material";
import { Table, TablePagination } from "@material-ui/core";
import { MenuAppBar } from "./BookIndexHeader";
import { BottomAppBar } from "./BookIndexBottom";

const BookIndex = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
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

  return (
    <div>
      <>
        <MenuAppBar />
      </>
      <div className="index-body">
        <div className="index-box">
          {books.map((data) => {
            return (
              <Container maxWidth="sm">
                <Card className="index-card">
                  <CardActionArea component={Link} to={`/detail/${data.id}`}>
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        {data.reviewer}さん
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        {data.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {data.review}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Container>
            );
          })}
        </div>
        <Table className="book-table">
          <TablePagination
            count={100}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPageOptions={[]}
            rowsPerPage={perPage}
          />
        </Table>
      </div>
      <div>
        <BottomAppBar />
      </div>
    </div>
  );
};

export { BookIndex };
