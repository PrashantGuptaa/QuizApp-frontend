import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import customUseState from "../utils/commonOnchangeHook";
import { getToken, isEmpty, setToken, validateEmail, validatePassword, isUserLoggedIn } from "../utils/commonFunctions";
import { APIEndPoints } from "../APIEndpoints/ApiEndPoints";
import AlertMessage from '../utils/alert';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border:'1px solid black',
    boxShadow:'2px 0px 5px 0px black',
    padding: '10px 30px 30px 30px',
    borderRadius: '10px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  let [firstName, setFirstName] = customUseState("");
  let [lastName, setLastName] = customUseState("");
  let [email, setEmail] = customUseState("");
  let [password, setPassword] = customUseState("");
  let [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
  let [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
  let [emailErrorMessage, setEmailErrorMessage] = useState("");
  let [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  let [firstNameError, setFirstNameError] = useState(false);
  let [lastNameError, setLastNameError] = useState(false);
  let [emailError, setEmailError] = useState(false);
  let [passwordError, setPasswordError] = useState(false);
  let [showAlertMessage, setShowAlertMessage] = useState(false);
  let history = useHistory();

  const emptyFieldMessage = "This field cannnot be empty";

  useEffect(async () => {
    const userInformation = await isUserLoggedIn();
    if (userInformation && userInformation.auth) {
      history.push('/');
    }
  }, []);


  const showError = () => {
    setShowAlertMessage(true);
    setTimeout(() => setShowAlertMessage(false), 5000);
  };

  const closeAllErrorandErrorMessage = () => {
    setFirstNameErrorMessage('');
    setLastNameErrorMessage('');
    setEmailErrorMessage('');
    setPasswordErrorMessage('');
    setFirstNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setPasswordError(false);

  }

  const checkForErrors = () => {
    let hasErrors = false;
    if (!isEmpty(firstName)) {
      setFirstNameError(true);
      setFirstNameErrorMessage(emptyFieldMessage);
      hasErrors = true;
    }
    if (!isEmpty(lastName)) {
      setLastNameError(true);
      setLastNameErrorMessage(emptyFieldMessage);
      hasErrors = true;
    }

    if (!validateEmail(email)) {
      setEmailError(true);
      setEmailErrorMessage('Invalid Email Address');
      hasErrors = true;
    }

    if (!validatePassword(password)) {
      setPasswordError(true);
      setPasswordErrorMessage("Password length should be greater than 7 Characters");
      hasErrors = true;
    }
    setTimeout(() => closeAllErrorandErrorMessage(), 5000); // All Error Message will be closed after 5 seconds
    return hasErrors;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(firstName, lastName);
    if(checkForErrors()) return;

    try {
      const response = await axios.post(APIEndPoints.signup, {
        firstName,
        lastName,
        email,
        password
      });
      if(response.data.message === 'Existed') {
        showError();
        return;
      } 
      setToken("loginTokenQuiz", response.data.token);
      history.push('/');
    } catch (error) {
      console.error(error);
    }

  

  }

  return (
    <Container component="main" maxWidth="xs">
      {showAlertMessage && <AlertMessage
        showAlertMessage={showAlertMessage}
        severity="error"
        message={`Account with Email ${email} already exists`} />}
      <CssBaseline />
      <div className={classes.paper}>
        
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                error={firstNameError}
                helperText={firstNameErrorMessage}
                {...setFirstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                error={lastNameError}
                helperText={lastNameErrorMessage}
                {...setLastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={emailError}
                helperText={emailErrorMessage}
                {...setEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={passwordError}
                helperText={passwordErrorMessage}
                {...setPassword}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
      </Box>
    </Container>
  );
}
