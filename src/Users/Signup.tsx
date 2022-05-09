import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";
import { Button } from "@material-ui/core";

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

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
        navigate("/book-index");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
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
        <div>
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
            render={({ field: { value }, fieldState: { error } }) => (
              <TextField
                label="お名前"
                required
                value={value}
                variant="outlined"
                margin="dense"
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />
        </div>
        <div>
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
            render={({ field: { value }, fieldState: { error } }) => (
              <TextField
                label="メールアドレス"
                required
                value={value}
                variant="outlined"
                margin="dense"
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />
        </div>
        <div>
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
            render={({ field: { value }, fieldState: { error } }) => (
              <TextField
                label="パスワード"
                required
                value={value}
                variant="outlined"
                margin="dense"
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />
        </div>
        <div>
          <Button variant="contained" type="submit">
            Sing Up
          </Button>
        </div>
      </Box>
      <p>ログインはこちらから</p>
      <Link to="/login">Login</Link>
    </div>
  );
};

export { Signup };
