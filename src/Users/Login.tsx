import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

import { Box } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";
import { Button } from "@material-ui/core";

const Login = () => {
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
  const { signin } = useAuth();

  const onSubmit = (data: any) => {
    axios
      .post("https://api-for-missions-and-railways.herokuapp.com/signin", {
        email: data.email,
        password: data.password,
      })
      .then(function (response) {
        signin(response.data.token);
        console.log(response);
        navigate("/book-index");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="login">
      <div className="login-box">
        <div className="login-section">
          <h1>ログイン</h1>
          <Box
            component="form"
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="login-email">
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
            <div className="login-password">
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
                    type="password"
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

            <div className="login-btn-section">
              <Button
                type="submit"
                color="primary"
                variant="contained"
                size="large"
                className="login-btn"
              >
                ログイン
              </Button>
            </div>
          </Box>
          <div className="login-signup">
            <Link to="/signup">ユーザー登録はこちらから</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Login };
