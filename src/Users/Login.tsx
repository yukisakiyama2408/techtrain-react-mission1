import axios from "axios";
import { useForm } from "react-hook-form";
import { Navigate, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, getAccessToken, userName } = useAuth();

  const onSubmit = (data: any) => {
    axios
      .post("https://api-for-missions-and-railways.herokuapp.com/signin", {
        email: data.email,
        password: data.password,
      })
      .then(function (response) {
        signin(response.data.token);
        userName(data.name);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    if (getAccessToken()) {
      // Homeへリダイレクトする
      return <Navigate to={"/"} />;
    }
  };

  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>名前</label>
          <input {...register("name", { required: true })} />
          {errors.name && "文字が入力されていません"}
        </div>
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
          <button type="submit">Sing In</button>
        </div>
      </form>
      <p>ユーザー登録はこちらから</p>
      <Link to="/signup">Signup</Link>
    </div>
  );
};

export { Login };
