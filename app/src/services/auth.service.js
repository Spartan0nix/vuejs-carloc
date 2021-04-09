//Provide Login, Logout and Register methods
import axios from "axios";

const API_URL = "http://localhost:4000/api/v1/auth/";

class AuthService {
  /*-------------------------------------------------------------------------------------------------------------*/
  //Login method
  async login(user) {
    //Api post request with given credentials
    return await axios
      .post(API_URL + "signin", {
        username: user.username,
        password: user.password
      })
      .then(response => {
        //If accessToken define in the response payload
        if (response.data.accessToken) {
          //Stored the reponse in the localStorage
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        //Return the response data
        return response.data;
      });
  }
  /*-------------------------------------------------------------------------------------------------------------*/
  //Logout method
  logout() {
    //Remove the user data stored in localStorage
    localStorage.removeItem("user");
  }
  /*-------------------------------------------------------------------------------------------------------------*/
  //Register method
  async register(user) {
    //Post request to create a new user
    return await axios.post(API_URL + "signup", {
      lastname: user.lastname,
      firstname: user.firstname,
      username: user.username,
      email: user.email,
      password: user.password,
      roles: user.roles
    });
  }
}

export default new AuthService();
