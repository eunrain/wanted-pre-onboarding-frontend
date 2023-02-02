import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
});

export const token = localStorage.getItem("token");

export const SignUpAPI = {
  signUp: (payload) => instance.post(`auth/signup`, payload),
};

export const LoginAPI = {
  login: (payload) => instance.post(`auth/signin`, payload),
};
