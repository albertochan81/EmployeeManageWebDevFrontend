import axios from "axios";

export default axios.create({
  URL: "/api",
  baseURL: "https://final-backened.herokuapp.com/api",
  //baseURL: "http://localhost:80/api",
  headers: {
    "Content-type": "application/json"
  }
});