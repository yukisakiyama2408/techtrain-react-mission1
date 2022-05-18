import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";
import { Button } from "@material-ui/core";

const BookNew = () => {
  const navigate = useNavigate();
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

  const { accessToken: api_token } = useAuth();

  const urlUsersApi =
    "https://api-for-missions-and-railways.herokuapp.com/books";

  const onSubmit = (data: any) => {
    console.log(data);
    axios
      .post(
        urlUsersApi,
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
      <h1>レビュー登録</h1>
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
    </div>
  );
};

export { BookNew };

//title
//url
//detail
//review
