import AuthService from "../services/auth.service";

//Stored the current User
const user = JSON.parse(localStorage.getItem("user"));
//Define the initialState : if user => status login: true and user = user
//                          else !user => status login: false and user = null
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

//Execute method stored in auth.service.js
export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    //dispatch('auth/login', this.user)
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit("loginSuccess", user);
          return Promise.resolve(user);
        },
        error => {
          commit("loginFailure");
          // return Promise.reject(error);
          throw new Error(error);
        }
      );
    },
    //dispatch('auth/logout')
    logout({ commit }) {
      AuthService.logout();
      commit("logout");
    },
    //dispatch('auth/logout', this.user)
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit("registerSuccess");
          return Promise.resolve(response.data);
        },
        error => {
          commit("registerFailure");
          // return Promise.reject(error);
          throw new Error(error);
        }
      );
    }
  },
  mutations: {
    //User logged without error => loggedIn => true | user stored
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    //error during logging in => loggedIn: false | user define to null
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    //user logging out => loggedIn: false | user define to null
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    //User register success => loggedIn: true but user need to loggin in to get an accessToken
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    //User register failed => loggedIn: false
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  }
};
