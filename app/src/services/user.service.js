import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4000/api/v1/auth/";

class UserService {
  getUserRole() {
    return axios.get(API_URL + "role", { headers: authHeader() });
  }

  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }

  updateUser(user) {
    return axios.put(API_URL + "update", user, { headers: authHeader() });
  }

  changePasswd(password) {
    return axios.put(API_URL + "updatePasswd", password, {
      headers: authHeader()
    });
  }
}

export default new UserService();
