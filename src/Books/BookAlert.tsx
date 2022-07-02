import * as React from "react";
import { Alert, Stack } from "@mui/material";

const deleteAlerts = () => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="success">削除しました！</Alert>
    </Stack>
  );
};

export { deleteAlerts };
