import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
export default function ButtonAppBar() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState();
  React.useEffect(() => {
    const users = window.localStorage.getItem("users");
    let user = JSON.parse(users);
    setUser(user);
  }, [navigate]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() =>
              user?.name
                ? navigate("/home")
                : user?.email
                ? navigate("/admin")
                : ""
            }
          >
            {user?.name ? "Booking" : user?.email ? "Bus- Setup" : ""}
          </Button>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textTransform: "capitalize" }}
            onClick={() => !user?.name && !user?.email && navigate("/")}
          >
            Welcome {user?.name ? user?.name : user?.email ? "Admin" : ""}
          </Typography>
          {user?.name || user?.email ? (
            <Button
              color="inherit"
              onClick={() => {
                localStorage.removeItem("users");
                setUser("");
                navigate("/");
              }}
            >
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={() => navigate("/")}>
              Login
            </Button>
          )}
          {(user?.name || user?.email) && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() =>
                user?.email == "movers@admin.com"
                  ? navigate("/admin/bus")
                  : navigate("/booked")
              }
            >
              <BookmarkAddedIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
