import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteAlerts } from "./BookAlert";
const DeleteReviewAlert = () => {
  const navigate = useNavigate();
  const { accessToken: api_token } = useAuth();
  const { id } = useParams();
  const bookDetailUrl = `https://api-for-missions-and-railways.herokuapp.com/books/${id}`;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    axios
      .delete(bookDetailUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${api_token}`,
        },
        data: {},
      })
      .then((res) => {
        deleteAlerts();
        console.log(res.data);
        navigate("/book-index");
      });
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <DeleteIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"このレビューを削除しますか?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            「削除する」を押すと本レビューが削除されます。削除後はレビューは復元できないため、ご注意ください。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} autoFocus>
            削除する
          </Button>
          <Button onClick={handleClose}>削除しない</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export { DeleteReviewAlert };
