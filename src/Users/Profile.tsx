import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";
import { Button } from "@material-ui/core";

const Profile = () => {
  const navigate = useNavigate();
  const { getAccessToken } = useAuth();
  const api_token = getAccessToken();

  const [userName, setUserName] = useState("");

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

  const urlUsersApi =
    "https://api-for-missions-and-railways.herokuapp.com/users";

  useEffect(() => {
    axios
      .get(urlUsersApi, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${api_token}`,
        },
        data: {},
      })
      .then((res) => {
        setUserName(res.data.name);
      });
  }, []);

  const onSubmit = (data: any) => {
    console.log(data);
    axios
      .put(
        urlUsersApi,
        {
          name: data.name,
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
  console.log(userName);

  return (
    <div>
      <h1>ユーザー情報編集</h1>

      {userName && (
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
              render={({
                field: { onBlur, onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="お名前"
                  required
                  value={value}
                  defaultValue={userName}
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
          <div>
            <Button variant="contained" type="submit">
              更新する
            </Button>
          </div>
        </Box>
      )}
    </div>
  );
};

export { Profile };
