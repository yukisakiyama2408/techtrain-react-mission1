import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@material-ui/core";

const BottomAppBar = () => {
  const StyledFab = styled(Fab)({
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  });

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar className="add-btn">
          <StyledFab color="secondary" aria-label="add">
            <Button component={Link} to={"/new"}>
              <AddIcon />
            </Button>
          </StyledFab>
        </Toolbar>
      </AppBar>
    </>
  );
};

export { BottomAppBar };
