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
  const { accessToken: api_token } = useAuth();

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
    <div className="profile">
      <div className="profile-box">
        <div className="profile-section">
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
              <div className="profile-name">
                <Controller
                  name="name"
                  control={control}
                  defaultValue={userName}
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
              <div className="profile-btn-section">
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  size="large"
                  className="profile-btn"
                >
                  更新する
                </Button>
              </div>
            </Box>
          )}
        </div>
      </div>
    </div>
  );
};

export { Profile };
