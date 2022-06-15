import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    criteriaMode: "all",
    shouldFocusError: false,
  });

  const urlUsersApi =
    "https://api-for-missions-and-railways.herokuapp.com/users";

  const onSubmit = (data: any) => {
    console.log(data);
    axios
      .post(urlUsersApi, {
        name: data.name,
        email: data.email,
        password: data.password,
      })
      .then(function (response) {
        console.log(response);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="signup">
      <ThemeProvider theme={theme}>
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              ユーザー登録
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="name"
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
                        label="お名前"
                        required
                        fullWidth
                        id="fullName"
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
                    name="email"
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
                        label="メールアドレス"
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
                    name="password"
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
                        label="パスワード"
                        fullWidth
                        required
                        margin="normal"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={value}
                        variant="outlined"
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
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to={"/login"}>ログインはこちらから</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      {/* <div className="signup-box">
        <div className="signup-section">
          <h1>ユーザ登録</h1>
          <Box
            component="form"
            marginTop="50px"
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="signup-name">
              <Controller
                name="name"
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
                    label="お名前"
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
            <div className="signup-email">
              <Controller
                name="email"
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
                    label="メールアドレス"
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
            <div className="signup-password">
              <Controller
                name="password"
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
                    label="パスワード"
                    required
                    type="password"
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
            <div className="signup-btn-section">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="signup-btn"
                size="large"
              >
                Sing Up
              </Button>
            </div>
          </Box>
          <div className="singup-login">
            <Link to="/login">ログインはこちらから</Link>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export { Signup };
