import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Avatar,
  CssBaseline,
  Typography,
  Container,
  Button,
  Grid,
} from "@mui/material";
import { Controller } from "react-hook-form";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

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
      {userName && (
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
              <AccountCircleIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              ????????????????????????
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <Controller
                name="name"
                control={control}
                defaultValue={userName}
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
                    label="?????????"
                    fullWidth
                    margin="normal"
                    required
                    value={value}
                    variant="outlined"
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(error)}
                    helperText={error?.message}
                  />
                )}
              />

              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                fullWidth
                size="large"
                className="login-btn"
              >
                ????????????
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
      )}
    </div>
  );
};

export { Profile };
