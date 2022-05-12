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
    mode: "onBlur", // blur イベントからバリデーションがトリガーされます。
    criteriaMode: "all", // all -> 発生した全てのエラーが収集されます。
    shouldFocusError: false, //true -> エラーのある最初のフィールドがフォーカスされます。
  });
  const { signin, getAccessToken } = useAuth();

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
    <div>
      <h1>ログイン</h1>
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
            render={({
              field: { onBlur, onChange, value },
              fieldState: { error },
            }) => (
              <TextField
                label="パスワード"
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
        <div>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            size="large"
          >
            ログイン
          </Button>
        </div>
      </Box>

      <p>ユーザー登録はこちらから</p>
      <Link to="/signup">Signup</Link>
    </div>
  );
};

export { Login };
