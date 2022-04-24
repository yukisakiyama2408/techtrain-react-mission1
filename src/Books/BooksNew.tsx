import { useForm } from "react-hook-form";
import axios from "axios";

const BookNew = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const urlUsersApi =
    "https://api-for-missions-and-railways.herokuapp.com/books";

  const onSubmit = (data: any) => {
    console.log(data);
    axios
      .post(urlUsersApi, {})
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
          <label>タイトル</label>
          <input {...register("title", { required: true })} />
          {errors.title && "文字が入力されていません"}
        </div>
        <div>
          <label>URL</label>
          <input {...register("url", { required: true })} />
          {errors.url && "URLが入力されていません"}
        </div>
        <div>
          <label>詳細</label>
          <textarea {...register("detail", { required: true })} />
          {errors.detail && "本の詳細を入力してください"}
        </div>
        <div>
          <label>レビュー</label>
          <textarea {...register("review", { required: true })} />
          {errors.review && "本のレビューを入力してください"}
        </div>
        <div>
          <button type="submit">登録</button>
        </div>
      </form>
    </div>
  );
};

export { BookNew };

//title
//url
//detail
//review
