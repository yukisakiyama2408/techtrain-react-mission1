import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

type Book = {
  title: string;
  url: string;
  detail: string;
  review: string;
};

const BookEdit = () => {
  const navigate = useNavigate();
  const { getAccessToken } = useAuth();
  const api_token = getAccessToken();
  const { id } = useParams();

  const [book, setBook] = useState<Book | null>(null);

  //const [bookTitle, setBookTitle] = useState("");
  //const [bookUrl, setBookUrl] = useState("");
  //const [bookDetail, setBookDetail] = useState("");
  //const [bookReview, setBookReview] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const bookEditUrl = `https://api-for-missions-and-railways.herokuapp.com/books/${id}`;

  useEffect(() => {
    axios
      .get(bookEditUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${api_token}`,
        },
        data: {},
      })
      .then((res) => {
        setBook(res.data);
        //setBookTitle(res.data.title);
        //setBookUrl(res.data.url);
        //setBookDetail(res.data.detail);
        //setBookReview(res.data.review);
      });
  }, []);

  const onSubmit = (data: any) => {
    console.log(data);
    axios
      .put(
        bookEditUrl,
        {
          title: data.title,
          url: data.url,
          detail: data.detail,
          review: data.review,
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
        navigate("/book-index");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>書籍レビュー編集</h1>
      {book && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>タイトル</label>
            <input
              defaultValue={book.title}
              {...register("title", { required: true })}
            />
            {errors.title && "文字が入力されていません"}
          </div>
          <div>
            <label>URL</label>
            <input
              defaultValue={book.url}
              {...register("url", { required: true })}
            />
            {errors.url && "文字が入力されていません"}
          </div>
          <div>
            <label>詳細</label>
            <input
              defaultValue={book.detail}
              {...register("detail", { required: true })}
            />
            {errors.detail && "文字が入力されていません"}
          </div>
          <div>
            <label>レビュー</label>
            <input
              defaultValue={book.review}
              {...register("review", { required: true })}
            />
            {errors.review && "文字が入力されていません"}
          </div>
          <div>
            <button type="submit">更新する</button>
          </div>
        </form>
      )}
    </div>
  );
};

export { BookEdit };
