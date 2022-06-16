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
                <Card className="index-card">
                  <CardActionArea component={Link} to={`/detail/${data.id}`}>
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        key={data.id}
                      >
                        {data.reviewer}さん
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        key={data.id}
                      >
                        {data.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        key={data.id}
                      >
                        {data.review}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
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
