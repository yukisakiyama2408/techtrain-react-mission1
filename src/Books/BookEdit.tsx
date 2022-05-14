import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";
import { Button } from "@material-ui/core";

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
    control,
  } = useForm({
    mode: "onBlur",
    criteriaMode: "all",
    shouldFocusError: false,
  });

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
        <Box
          component="form"
          marginTop="50px"
          width="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Controller
              name="title"
              control={control}
              rules={{
                required: "入力必須ですよ！",
                maxLength: {
                  value: 30,
                  message: "30文字以下で入力してくださいね！",
                },
              }}
              render={({
                field: { onBlur, onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="タイトル"
                  required
                  value={value}
                  defaultValue={book.title}
                  variant="outlined"
                  margin="dense"
                  onChange={onChange}
                  onBlur={onBlur}
                  error={Boolean(error)}
                  helperText={error?.message}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="url"
              control={control}
              rules={{
                required: "入力必須ですよ！",
              }}
              render={({
                field: { onBlur, onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="URL"
                  required
                  value={value}
                  defaultValue={book.url}
                  variant="outlined"
                  margin="dense"
                  onChange={onChange}
                  onBlur={onBlur}
                  error={Boolean(error)}
                  helperText={error?.message}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="detail"
              control={control}
              rules={{
                required: "入力必須ですよ！",
                maxLength: {
                  value: 30,
                  message: "30文字以下で入力してくださいね！",
                },
              }}
              render={({
                field: { onBlur, onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="詳細"
                  required
                  value={value}
                  defaultValue={book.detail}
                  variant="outlined"
                  margin="dense"
                  onChange={onChange}
                  onBlur={onBlur}
                  error={Boolean(error)}
                  helperText={error?.message}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="review"
              control={control}
              rules={{
                required: "入力必須ですよ！",
                maxLength: {
                  value: 30,
                  message: "30文字以下で入力してくださいね！",
                },
              }}
              render={({
                field: { onBlur, onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="レビュー"
                  required
                  value={value}
                  variant="outlined"
                  defaultValue={book.review}
                  margin="dense"
                  onChange={onChange}
                  onBlur={onBlur}
                  error={Boolean(error)}
                  helperText={error?.message}
                />
              )}
            />
          </div>
          <div>
            <Button variant="contained" type="submit">
              投稿する
            </Button>
          </div>
        </Box>
      )}
    </div>
  );
};

export { BookEdit };
