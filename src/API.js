import axios from "axios";

export let endpoints = {
    user: "users/",
    login: "o/token/",
    currentUser: "users/current-user/",
    tracking: "orders/"
};

export default axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

