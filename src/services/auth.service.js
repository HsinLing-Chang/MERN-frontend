import axios from "axios";
const API_URL = "https://login-api-b0s7.onrender.com/auth";

class AuthService {
  login(email, password) {
    return axios.post(API_URL + "/login", {
      email,
      password,
    });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username, email, password, role) {
    //axios.post return a promise object
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
      role,
    });
  }

  getCurrentUser() {
    console.log(localStorage.getItem("user"));
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
