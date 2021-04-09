import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4000/api/v1/rent/";

class RentService {
  updateRent(rent) {
    return axios.put(API_URL + "updateRent", rent, { headers: authHeader() });
  }
}

export default new RentService();
