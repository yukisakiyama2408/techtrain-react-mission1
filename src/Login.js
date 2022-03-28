import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [redirect, setRedirect] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("https://api-for-missions-and-railways.herokuapp.com/signin", {
        name: "string",
        email: "string",
        password: "string",
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setRedirect(true);
  };

  if (redirect) {
    // Homeへリダイレクトする
    return <Navigate to={"/"} />;
  }

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
