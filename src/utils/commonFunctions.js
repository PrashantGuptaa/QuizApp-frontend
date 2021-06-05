import axios from 'axios';
import { APIEndPoints } from '../APIEndpoints/ApiEndPoints';

export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const isEmpty = (value) => {
  return value.trim();
};

export const setToken = (key, value) => {
  localStorage.setItem(key, value);
};

export const getToken = (key) => {
  return localStorage.getItem(key);
};

export const isUserLoggedIn = async () => {
  try {
    const token = getToken("loginTokenQuiz");
    if(!token) 
    return false;
    const response = await axios({
      method: "get",
      url: APIEndPoints.verifyUser,
      headers: { "x-access-token": token },
    });
    console.log("Shift Response",response);
    if (response && response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
