import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { Button } from "@material-ui/core";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>メールアドレス</label>
          <input {...register("email", { required: true })} />
          {errors.email && "メールアドレスが入力されていません"}
        </div>
        <div>
          <label>パスワード</label>
          <input {...register("password", { required: true })} />
          {errors.password && "パスワードを入力してください"}
        </div>
        <div>
          <Button variant="contained" type="submit">
            Sing In
          </Button>
        </div>
      </form>
      <p>ユーザー登録はこちらから</p>
      <Link to="/signup">Signup</Link>
    </div>
  );
};

export { Login };
