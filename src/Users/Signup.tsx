import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//export const apiClient = axios.create({
//baseURL: "https://api-for-missions-and-railways.herokuapp.com/users",
//responseType: "json",
//headers: {
//token: "string",
//},
//});

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const urlUsersApi =
    "https://api-for-missions-and-railways.herokuapp.com/users";

  const onSubmit = (data: any) => {
    console.log(data);
    axios
      .post(urlUsersApi, {
        name: data.name,
        email: data.email,
        password: data.password,
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
          <button type="submit">Sing Up</button>
        </div>
      </form>
      <p>ログインはこちらから</p>
      <Link to="/login">Login</Link>
    </div>
  );
};

export { Signup };