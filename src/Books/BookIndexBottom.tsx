import * as React from "react";
import {
  styled,
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  Typography,
  IconButton,
  Fab,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
// import { Button } from "@material-ui/core";

const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: "#757ce8",
  //   },
  // },
});

const BottomAppBar = () => {
  const StyledFab = styled(Fab)({
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
    backgroundColor: "#3f50b5",
  });

  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppBar
          position="fixed"
          color="primary"
          sx={{ top: "auto", bottom: 0 }}
        >
          <Toolbar>
            <StyledFab color="secondary" aria-label="add">
              <IconButton color="inherit" component={Link} to={"/new"}>
                <AddIcon />
              </IconButton>
            </StyledFab>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </React.Fragment>
  );
};

export { BottomAppBar };
