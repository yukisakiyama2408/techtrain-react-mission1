import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useAuth } from "../Contexts/AuthContext";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";

const MenuAppBar = () => {
  const { accessToken } = useAuth();
  const isSignedIn = accessToken != null;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
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
            Book Reviews
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
              <MoreIcon />
            </IconButton>
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
              {isSignedIn && (
                <>
                  {" "}
                  <MenuItem onClick={handleClose}>
                    {" "}
                    <Button onClick={SignOut}>Logout</Button>
                  </MenuItem>
                  {/* <MenuItem onClick={handleClose}>
                    {" "}
                    <Button component={Link} to={"/profile"}>
                      Edit Profile
                    </Button>
                  </MenuItem> */}
                </>
              )}
              {/* <MenuItem onClick={handleClose}>
                {isSignedIn && (
                  <>
                    <div>
                      <Button component={Link} to={"/profile"}>
                        Logout
                      </Button>
                    </div>
                    <div>
                      <Button component={Link} to={"/profile"}>
                        Edit Profile
                      </Button>
                    </div>
                  </>
                )}
              </MenuItem> */}
              {/* <MenuItem onClick={handleClose}>
                {isSignedIn && (
                  <Button component={Link} to={"/profile"}>
                    Edit Profile
                  </Button>
                )}
              </MenuItem> */}
              <MenuItem onClick={handleClose}>
                {!isSignedIn && (
                  <Button component={Link} to={"/login"}>
                    Login
                  </Button>
                )}
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export { MenuAppBar };
