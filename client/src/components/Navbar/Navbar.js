import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import memories from "../../images/memories.jpg";
import useStyles from "./styles";
import decode from "jwt-decode";

const Navbar = () => {
  const styles = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // console.log("Logging user:");
  // console.log(user);

  useEffect(() => {
    //JWT...
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };

  return (
    <AppBar className={styles.appBar} position="static" color="inherit">
      <div className={styles.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={styles.heading}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img
          className={styles.image}
          src={memories}
          alt="memories"
          width="10%"
        />
      </div>
      <Toolbar className={styles.toolbar}>
        {user ? (
          <div className={styles.profile}>
            <Avatar
              className={styles.purple}
              alt={user.result.name}
              src={user.result.picture}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={styles.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={styles.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
            onClick={() => {}}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
