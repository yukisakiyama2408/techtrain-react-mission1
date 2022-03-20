import React from "react";
import { useForm } from "react-hook-form";
import "./App.css";

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div className="container">
      <div className="login-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>
              メールアドレス
              <input
                id="email"
                type="text"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="error">メールアドレスを入力してください</p>
              )}
            </label>
          </div>
          <div className="form-group">
            <label>
              パスワード
              <input
                id="password"
                type="password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="error">パスワードを入力してください</p>
              )}
            </label>
          </div>
          <button type="submit">ログイン</button>
        </form>
      </div>
    </div>
  );
};

export { Login };
