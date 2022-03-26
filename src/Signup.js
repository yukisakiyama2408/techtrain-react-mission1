import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://api-for-missions-and-railways.herokuapp.com/users",
  responseType: "json",
  headers: {
    token: "string",
  },
});

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("https://api-for-missions-and-railways.herokuapp.com/users", {
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
  };

  return (
    <div>
      <h1>ユーザ登録</h1>
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
    </div>
  );
};

export { Signup };
