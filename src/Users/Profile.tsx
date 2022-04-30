import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../Contexts/AuthContext";

const Profile = () => {
  const { getAccessToken } = useAuth();
  const api_token = getAccessToken();

  const [userName, setUserName] = useState(" ");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  console.log(userName);

  return (
    <div>
      <h1>ユーザー情報編集</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>名前</label>
          <input
            defaultValue={userName}
            {...register("name", { required: true })}
          />
          {errors.name && "文字が入力されていません"}
        </div>

        <div>
          <button type="submit">update</button>
        </div>
      </form>
    </div>
  );
};

export { Profile };
