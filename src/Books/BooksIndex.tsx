import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Container } from "@material-ui/core";
import { CardActionArea } from "@mui/material";
import { Table, TablePagination } from "@material-ui/core";
import TableContainer from "@mui/material/TableContainer";
import { MenuAppBar } from "./BookIndexHeader";
import { BottomAppBar } from "./BookIndexBottom";

const BookIndex = () => {
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
      .then((res) => {});
  }, []);

  return (
    <div>
      <>
        <MenuAppBar />
      </>
      <div className="index-body">
        <div className="index-box">
          <Container maxWidth="sm">
            {books.map((data) => {
              return (
                <CardActionArea component={Link} to={`/detail/${data.id}`}>
                  <Card className="index-card">
                    <Container>
                      <CardContent key={data.id}>
                        <Typography gutterBottom variant="h5" component="div">
                          {data.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          gutterBottom
                        >
                          {data.reviewer}さんのコメント：
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {data.review}
                        </Typography>
                      </CardContent>
                    </Container>
                  </Card>
                </CardActionArea>
              );
            })}
            <TableContainer>
              <Table>
                <TablePagination
                  count={100}
                  page={page}
                  onPageChange={(e, newPage) => setPage(newPage)}
                  rowsPerPageOptions={[]}
                  rowsPerPage={perPage}
                />
              </Table>
            </TableContainer>
          </Container>
        </div>
      </div>
      <div>
        <BottomAppBar />
      </div>
    </div>
  );
};

export { BookIndex };
