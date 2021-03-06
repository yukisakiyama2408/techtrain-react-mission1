import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import {
  CssBaseline,
  Box,
  TextField,
  Grid,
  Avatar,
  Typography,
  Container,
  Button,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

type Book = {
  id: string;
  title: string;
  url: string;
  detail: string;
  review: string;
};

const BookEdit = () => {
  const navigate = useNavigate();
  const { accessToken: api_token } = useAuth();
  const { id } = useParams();

  const [book, setBook] = useState<Book | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: "onBlur",
    criteriaMode: "all",
    shouldFocusError: false,
  });

  const bookEditUrl = `https://api-for-missions-and-railways.herokuapp.com/books/${id}`;

  useEffect(() => {
    axios
      .get(bookEditUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${api_token}`,
        },
        data: {},
      })
      .then((res) => {
        setBook(res.data);
      });
  }, []);

  const onSubmit = (data: any) => {
    console.log(data);
    axios
      .put(
        bookEditUrl,
        {
          title: data.title,
          url: data.url,
          detail: data.detail,
          review: data.review,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${api_token}`,
          },
          data: {},
        }
      )
      .then(function (response) {
        console.log(response);
        navigate("/book-index");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="edit">
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <MenuBookIcon fontSize="large" />
            </Avatar>
            <Typography component="h1" variant="h5">
              ???????????????????????????
            </Typography>
            {book && (
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 1 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Controller
                      name="title"
                      control={control}
                      defaultValue={book.title}
                      rules={{
                        required: "????????????????????????",
                        maxLength: {
                          value: 30,
                          message: "30?????????????????????????????????????????????",
                        },
                      }}
                      render={({
                        field: { onBlur, onChange, value },
                        fieldState: { error },
                      }) => (
                        <TextField
                          label="????????????"
                          fullWidth
                          required
                          value={value}
                          variant="outlined"
                          margin="normal"
                          onChange={onChange}
                          onBlur={onBlur}
                          error={Boolean(error)}
                          helperText={error?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name="url"
                      control={control}
                      defaultValue={book.url}
                      rules={{
                        required: "????????????????????????",
                      }}
                      render={({
                        field: { onBlur, onChange, value },
                        fieldState: { error },
                      }) => (
                        <TextField
                          label="URL"
                          required
                          fullWidth
                          value={value}
                          variant="outlined"
                          margin="normal"
                          onChange={onChange}
                          onBlur={onBlur}
                          error={Boolean(error)}
                          helperText={error?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="detail"
                      defaultValue={book.detail}
                      control={control}
                      rules={{
                        required: "????????????????????????",
                        maxLength: {
                          value: 30,
                          message: "30?????????????????????????????????????????????",
                        },
                      }}
                      render={({
                        field: { onBlur, onChange, value },
                        fieldState: { error },
                      }) => (
                        <TextField
                          label="??????"
                          required
                          fullWidth
                          value={value}
                          variant="outlined"
                          margin="normal"
                          onChange={onChange}
                          onBlur={onBlur}
                          error={Boolean(error)}
                          helperText={error?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="review"
                      control={control}
                      defaultValue={book.review}
                      rules={{
                        required: "????????????????????????",
                        maxLength: {
                          value: 30,
                          message: "30?????????????????????????????????????????????",
                        },
                      }}
                      render={({
                        field: { onBlur, onChange, value },
                        fieldState: { error },
                      }) => (
                        <TextField
                          label="????????????"
                          required
                          fullWidth
                          value={value}
                          variant="outlined"
                          margin="normal"
                          onChange={onChange}
                          onBlur={onBlur}
                          error={Boolean(error)}
                          helperText={error?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  fullWidth
                  size="large"
                  className="login-btn"
                >
                  ??????
                </Button>
                <Grid container>
                  <Grid item>
                    <Button component={Link} to={`/detail/${book.id}`}>
                      <KeyboardBackspaceIcon />
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        </Container>
      </div>
    </div>
  );
};

export { BookEdit };
