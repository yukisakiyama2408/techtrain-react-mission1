import * as React from "react";
import axios from "axios";
import { useState, useEffect, MouseEvent } from "react";
import { useAuth } from "../Contexts/AuthContext";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
  MenuItem,
  Menu,
  Container,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";

const MenuAppBar = () => {
  const { accessToken } = useAuth();
  const api_token = accessToken;
  const isSignedIn = accessToken != null;
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { signout } = useAuth();

  const SignOut = () => {
    signout();
    return navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              flexGrow: 1,
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            みんなの本棚
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            {isSignedIn && (
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Container>
                  <MenuItem>{userName}さん</MenuItem>
                </Container>
                <Container>
                  <MenuItem component={Link} to={"/profile"}>
                    プロフィールを編集
                  </MenuItem>
                </Container>
                <Container>
                  <MenuItem onClick={SignOut}>LOGOUT</MenuItem>
                </Container>

                {!isSignedIn && (
                  <MenuItem onClick={handleClose}>
                    <Button component={Link} to={"/login"}>
                      Login
                    </Button>
                  </MenuItem>
                )}
              </Menu>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export { MenuAppBar };
