import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
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
  const { accessToken: api_token } = useAuth();
  const { id } = useParams();

  const [book, setBook] = useState<Book | null>(null);

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
        alert("編集しました!");
        console.log(response);
        navigate("/book-index");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="edit">
      <div className="edit-box">
        <div className="edit-section">
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
              <div className="edit-title">
                <Controller
                  name="title"
                  control={control}
                  defaultValue={book.title}
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
                      //defaultValue={book.title}
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
              <div className="edit-url">
                <Controller
                  name="url"
                  control={control}
                  defaultValue={book.url}
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
                      //defaultValue={book.url}
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
              <div className="edit-detail">
                <Controller
                  name="detail"
                  defaultValue={book.detail}
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
              <div className="edit-review">
                <Controller
                  name="review"
                  control={control}
                  defaultValue={book.review}
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
                      //defaultValue={book.review}
                      margin="dense"
                      onChange={onChange}
                      onBlur={onBlur}
                      error={Boolean(error)}
                      helperText={error?.message}
                    />
                  )}
                />
              </div>
              <div className="edit-btn-section">
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  size="large"
                  className="edit-btn"
                >
                  投稿する
                </Button>
              </div>
            </Box>
          )}
          <div className="login-signup">
            <Link to="/book-index">戻る</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { BookEdit };
