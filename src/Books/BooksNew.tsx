import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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

const BookNew = () => {
  const navigate = useNavigate();
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

  const { accessToken: api_token } = useAuth();

  const urlUsersApi =
    "https://api-for-missions-and-railways.herokuapp.com/books";

  const onSubmit = (data: any) => {
    console.log(data);
    axios
      .post(
        urlUsersApi,
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
    <div>
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
              レビューを登録する
            </Typography>
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
                    rules={{
                      required: "入力必須ですよ！",
                      maxLength: {
                        value: 30,
                        message: "30文字以下で入力してくださいね！",
                      },
                    }}
                    render={({
                      field: { onBlur, onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        label="タイトル"
                        required
                        value={value}
                        fullWidth
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
                    rules={{
                      required: "入力必須ですよ！",
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
                    control={control}
                    rules={{
                      required: "入力必須ですよ！",
                      maxLength: {
                        value: 30,
                        message: "30文字以下で入力してくださいね！",
                      },
                    }}
                    render={({
                      field: { onBlur, onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        label="詳細"
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
                    name="review"
                    control={control}
                    rules={{
                      required: "入力必須ですよ！",
                      maxLength: {
                        value: 30,
                        message: "30文字以下で入力してくださいね！",
                      },
                    }}
                    render={({
                      field: { onBlur, onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        label="レビュー"
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
                投稿
              </Button>
              <Grid container>
                <Grid item>
                  <Button
                    component={Link}
                    to="/book-index"
                    className="detail-edit-btn"
                  >
                    <KeyboardBackspaceIcon />
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
        {/* <div className="new-section">
          <h1>レビュー登録</h1>
          <Box
            component="form"
            marginTop="50px"
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="new-title">
              <Controller
                name="title"
                control={control}
                rules={{
                  required: "入力必須ですよ！",
                  maxLength: {
                    value: 30,
                    message: "30文字以下で入力してくださいね！",
                  },
                }}
                render={({
                  field: { onBlur, onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="タイトル"
                    required
                    value={value}
                    variant="outlined"
                    margin="dense"
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(error)}
                    helperText={error?.message}
                  />
                )}
              />
            </div>
            <div className="new-url">
              <Controller
                name="url"
                control={control}
                rules={{
                  required: "入力必須ですよ！",
                }}
                render={({
                  field: { onBlur, onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="URL"
                    required
                    value={value}
                    variant="outlined"
                    margin="dense"
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(error)}
                    helperText={error?.message}
                  />
                )}
              />
            </div>
            <div className="new-detail">
              <Controller
                name="detail"
                control={control}
                rules={{
                  required: "入力必須ですよ！",
                  maxLength: {
                    value: 30,
                    message: "30文字以下で入力してくださいね！",
                  },
                }}
                render={({
                  field: { onBlur, onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="詳細"
                    required
                    value={value}
                    variant="outlined"
                    margin="dense"
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(error)}
                    helperText={error?.message}
                  />
                )}
              />
            </div>
            <div className="new-review">
              <Controller
                name="review"
                control={control}
                rules={{
                  required: "入力必須ですよ！",
                  maxLength: {
                    value: 30,
                    message: "30文字以下で入力してくださいね！",
                  },
                }}
                render={({
                  field: { onBlur, onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="レビュー"
                    required
                    value={value}
                    variant="outlined"
                    margin="dense"
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(error)}
                    helperText={error?.message}
                  />
                )}
              />
            </div>
            <div className="new-btn-section">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                size="large"
                className="new-btn"
              >
                投稿する
              </Button>
            </div>
          </Box>
          <div className="login-signup">
            <Link to="/book-index">戻る</Link>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export { BookNew };

//title
//url
//detail
//review
