import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const UserUpdate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const urlUsersApi =
    "https://api-for-missions-and-railways.herokuapp.com/users";
  console.log();
  useEffect(() => {
    axios.get(urlUsersApi).then((response) => {
      setName(response.data);
    });
  }, []);

  const onSubmit = (data: any) => {
    console.log(data);
    axios
      .put(urlUsersApi, {
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
      <h1>ユーザー情報編集</h1>
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
          <button type="submit">update</button>
        </div>
      </form>
    </div>
  );
};

export { UserUpdate };
