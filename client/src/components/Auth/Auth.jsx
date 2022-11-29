import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
// import Icon from "./icon";
// import { GoogleLogin } from "react-google-login";
// import { GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import useStyles from "./styles";
import { signin, signup } from "../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const styles = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(formData);

    if(isSignup){
      dispatch(signup(formData, navigate))
    }else{
      dispatch(signin(formData, navigate))
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  function handleShowPassword(event) {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  async function googleSuccess(res) {
    try {
      // console.log("Logging res:");
      // console.log(res);
      const result = jwt_decode(res.credential); //optional chaining causes the unexpected token error
      // console.log(result);
      dispatch({ type: "AUTH", payload: { result } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  function googleFailure() {
    console.log("Google sign in unsuccessful. Try again later");
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={styles.paper} elevation={3}>
        <Avatar className={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Re-enter Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            // render={(renderProps) => (
            //   <Button
            //     className={styles.googleButton}
            //     color="primary"
            //     fullWidth
            //     onClick={renderProps.onClick}
            //     disabled={renderProps.disabled}
            //     startIcon={<Icon />}
            //     variant="contained"
            //   >
            //     Google Sign In
            //   </Button>
            // )}
            onSuccess={googleSuccess}
            onError={googleFailure}
            // cookiePolicy="single_host_origin"
          />

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button
                onClick={() => {
                  setIsSignup((prevState) => !prevState);
                  // handleShowPassword(false);
                }}
              >
                {isSignup ? "Already have an account?" : "Create new account?"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
