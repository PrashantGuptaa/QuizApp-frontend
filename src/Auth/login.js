import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link, useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import customUseState from "../utils/commonOnchangeHook";
import { APIEndPoints } from "../APIEndpoints/ApiEndPoints";
import AlertMessage from '../utils/alert';
import axios from "axios";
import { validateEmail, validatePassword, setToken, isUserLoggedIn } from "../utils/commonFunctions";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  let [email, setemail] = customUseState("");
  let [password, setpassword] = customUseState("");
  let [emailHelperText, setEmailHelperText] = useState("");
  let [passwordHelperText, setpasswordHelperText] = useState("");
  let [emailError, setEmailError] = useState(false);
  let [passwordError, setpasswordError] = useState(false);
  let [showAlertMessage, setShowAlertMessage] = useState(false);
  let history = useHistory();

  useEffect(async () => {
   const userInformation = await isUserLoggedIn();
   if(userInformation && userInformation.auth) {
     history.push('/');
   }
  }, []);

 const  showLoginError = () => {
    setShowAlertMessage(true);
    setTimeout(() => setShowAlertMessage(false), 5000);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      setEmailHelperText("Invalid Email Address");
      setEmailError(true);
      return;
    }
    if (!validatePassword(password)) {
      setpasswordHelperText(
        "Password length should be greater than 7 Characters"
      );
      setpasswordError(true);
      setEmailHelperText("");
      setEmailError(false);
      return;
    }
    try {

      const response = await axios.post(APIEndPoints.login, {
        email,
        password
      });
      if (response && response.statusText === 'OK') {
        setToken("loginTokenQuiz", response.data.token);
        history.push('/');
        return;
      }
    } catch (error) {
      console.log(error);
      showLoginError();
    }
  };

  return (
    <Grid container component="main" className={classes.root}>

  
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        {showAlertMessage && <AlertMessage
          showAlertMessage={showAlertMessage}
          severity="error"
          message="Invalid Email or Password" />}
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={emailError}
              helperText={emailHelperText}
              {...setemail}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={passwordError}
              helperText={passwordHelperText}
              {...setpassword}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}></Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
