<template>
  <div id="main">
    <div id="container">
      <div id="profile_header">
        <h3>@{{ user_data.username }}</h3>
        <div id="switch-form">
          <div class="info_btn" @click="displayAccount">
            <p>Compte</p>
          </div>
          <div class="info_btn passwd_btn" @click="displayPasswd">
            <p>Mot de passe</p>
          </div>
        </div>
      </div>
      <div id="profile_content">
        <!-- First Part, allow the user to modify profile information such as Identity, username and Email address -->
        <form name="info_form" id="info-form" @submit.prevent="save && logout">
          <div class="content_form">
            <div id="form_about">
              <span
                v-if="SuccessMessage"
                id="SuccessMessage"
                key="SuccessMessage"
              >
                {{ SuccessMessage }}
              </span>
              <h5>Mes informations</h5>
              <span>
                <label for="firstname">Prénom</label>
                <input
                  v-validate="{ required: true, regex: /^[^0-9()]+$/ }"
                  name="firstname"
                  type="text"
                  v-model="user_data.first_name"
                />
                <span class="error" v-show="errors.first('firstname')"
                  >Prénom non-valide</span
                >
              </span>
              <span>
                <label for="lastname">Nom</label>
                <input
                  v-validate="{ required: true, regex: /^[^0-9()]+$/ }"
                  name="lastname"
                  type="text"
                  v-model="user_data.last_name"
                />
                <span class="error" v-show="errors.first('lastname')"
                  >Nom non-valide</span
                >
              </span>
              <span>
                <label for="username">Nom d'Utilisateur</label>
                <input
                  v-validate="{
                    required: true,
                    regex: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/,
                    max: 20,
                    min: 3
                  }"
                  name="username"
                  type="text"
                  v-model="user_data.username"
                />
                <span class="error" v-show="errors.first('username')"
                  >Nom non-valide</span
                >
              </span>
            </div>
            <div id="form_contact">
              <h5>Contact</h5>
              <span>
                <label for="email">Adresse Mail</label>
                <input
                  v-validate="'required|email'"
                  name="email"
                  type="text"
                  v-model="user_data.mail"
                />
                <span class="error" v-show="errors.first('email')"
                  >Adresse email non-valide</span
                >
              </span>
            </div>
            <div class="form_submission">
              <button @click="save">Modifier</button>
              <button @click="logout" class="logout">Déconnexion</button>
            </div>
          </div>
        </form>
        <!-- Second Part allow the user to change is password -->
        <form
          name="passwd_form"
          id="passwd-form"
          @submit.prevent="changePasswd"
        >
          <div class="content_form">
            <div id="form_password">
              <span
                v-if="changePasswdMsg"
                id="SuccessMessage"
                key="changePasswdMsg"
              >
                {{ changePasswdMsg }}
              </span>
              <h5>Changer votre mot de passe</h5>
              <span>
                <label for="password">Nouveau mot de passe</label>
                <input
                  v-validate="{ min: 5, max: 40 }"
                  name="password"
                  type="password"
                  :class="{ 'is-danger': errors.has('password') }"
                  ref="password"
                  id="password"
                />
                <span
                  v-show="errors.has('password')"
                  class="help is-danger error"
                  >5 caractères minimum<br />40 caractères maximum</span
                >
              </span>
              <span>
                <label for="password_confirmation"
                  >Confirmer votre mot de passe</label
                >
                <input
                  v-validate="'confirmed:password|min:5|max:40'"
                  name="password_confirmation"
                  type="password"
                  :class="{ 'is-danger': errors.has('password_confirmation') }"
                  data-vv-as="password"
                  v-model="newPassword"
                  id="confirmPasswd"
                />
                <span
                  v-show="errors.has('password_confirmation')"
                  class="help is-danger error"
                  >Veuillez confirmer votre nouveau mot de passe.</span
                >
              </span>
            </div>
            <div class="form_submission">
              <button @click="changePasswd">Modifier</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../../services/user.service";
import Validator from "../../helpers/validator";

export default {
  name: "Profile",
  data() {
    return {
      user_data: [],
      loading: false,
      SuccessMessage: "",
      newPassword: "",
      changePasswdMsg: ""
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    if (this.currentUser) {
      UserService.getUserRole()
        .then(response => {
          if (response.data.role[0].role_name === "Admin") {
            UserService.getAdminBoard()
              .then(user => {
                this.user_data = user.data.user[0];
              })
              .catch(err => {
                this.user_data = err.response;
              });
          } else if (response.data.role[0].role_name === "Utilisateur") {
            UserService.getUserBoard()
              .then(user => {
                this.user_data = user.data.user[0];
              })
              .catch(err => {
                this.user_data = err.response;
              });
          }
        })
        .catch(err => {
          this.user_data = err.response;
        });
    }
  },
  methods: {
    save() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (
          this.user_data.first_name &&
          this.user_data.last_name &&
          this.user_data.username &&
          this.user_data.mail &&
          this.currentUser.accessToken
        ) {
          UserService.updateUser(this.user_data)
            .then(user => {
              this.user_data = user.data.user[0];
              this.SuccessMessage = user.data.message;
            })
            .catch(err => {
              this.user_data = err.response;
            });
        } else {
          console.log("Il manque des choses");
        }
      });
    },
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    changePasswd() {
      let passwordInput = document.querySelector("#password").value;
      let passwordConfirmInput = document.querySelector("#confirmPasswd").value;

      if (
        passwordInput === "" ||
        passwordInput === undefined ||
        passwordConfirmInput === "" ||
        passwordConfirmInput === undefined
      ) {
        return false;
      } else if (this.newPassword === "" || this.newPassword === undefined) {
        return false;
      } else if (passwordInput != passwordConfirmInput) {
        return false;
      } else {
        let passwd = Validator.encryptPasswd(this.newPassword);
        let encryptNewPasswd = { password: passwd };
        UserService.changePasswd(encryptNewPasswd)
          .then(password => {
            this.changePasswdMsg = password.data.message;
            document.querySelector("#password").value = "";
            document.querySelector("#confirmPasswd").value = "";
          })
          .catch(err => {
            this.changePasswdMsg = err;
          });
      }
    },
    displayAccount() {
      document.querySelector("#info-form").style.display = "block";
      document.querySelector("#passwd-form").style.display = "none";
    },
    displayPasswd() {
      document.querySelector("#info-form").style.display = "none";
      document.querySelector("#passwd-form").style.display = "block";
    }
  }
};
</script>

<style scoped>
/*--------------------------------------------------------------------------------------------*/
* {
  margin: 0;
  padding: 0;
}
#container {
  /* border: 2px solid red; */
  margin-top: 80px;
}
#passwd-form {
  display: none;
}
/*--------------------------------------------------------------------------------------------*/
#profile_header {
  text-align: center;
  padding-top: 20px;
  border-bottom: 2px solid grey;
}
#profile_header h3 {
  font-weight: 500;
  margin-bottom: 10px;
}
#switch-form {
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
}
.info_btn {
  width: 100px;
  text-align: left;
  font-size: 18px;
}
.info_btn:hover {
  cursor: pointer;
}
.info_btn p {
  border: 2px solid grey;
  border-bottom: none;
  border-radius: 10px 10px 0px 0px;
  -moz-border-radius: 10px 10px 0px 0px;
  -webkit-border-radius: 10px 10px 0px 0px;
  width: 130px;
  padding: 10px 0 10px 10px;
}
.passwd_btn {
  margin-left: 35px;
}
/*--------------------------------------------------------------------------------------------*/
#profile_content {
  display: flex;
  flex-direction: column;
  /* border: 2px solid green; */
  max-width: 700px;
  margin: 0 auto;
  padding: 30px;
  transition: 0.4s all;
}
/*--------------------------------------------------------------------------------------------*/
.content_form {
  display: flex;
  flex-direction: column;
}
/*--------------------------------------------------------------------------------------------*/
#form_about {
  display: flex;
  flex-direction: column;
  padding: 10px 0 30px 0;
}
#form_about h5 {
  font-size: 25px;
  width: 208px;
  border-bottom: 2px solid green;
  margin-bottom: 5px;
  font-weight: 600;
}
#form_about span {
  font-size: 17px;
  display: flex;
  flex-direction: column;
  padding: 3px 0 3px 0;
}
#form_about span input[type="text"] {
  max-width: 400px;
  margin: 8px 0 8px 0;
  padding: 5px;
  border-radius: 5px;
  outline: none;
  border: 2px solid grey;
  background-color: #fbfbfb;
}
/*--------------------------------------------------------------------------------------------*/
#SuccessMessage {
  border: 2px solid #64af5a;
  border-radius: 5px;
  background-color: #64af5a;
  margin: -20px auto 20px auto;
  text-align: center;
  width: 250px;
  color: black;
  transition-property: top, bottom;
  transition-duration: 400ms;
}
/*--------------------------------------------------------------------------------------------*/
#form_contact {
  display: flex;
  flex-direction: column;
  padding: 0px 0 0px 0;
}
#form_contact h5 {
  font-size: 25px;
  border-bottom: 2px solid green;
  width: 90px;
  margin-bottom: 5px;
  font-weight: 600;
}
#form_contact span {
  display: flex;
  flex-direction: column;
  padding: 10px 0 10px 0;
  font-size: 17px;
  margin-bottom: 10px;
}
#form_contact span input[type="text"] {
  max-width: 400px;
  margin: 8px 0 8px 0;
  padding: 5px;
  border-radius: 5px;
  outline: none;
  border: 2px solid grey;
  background-color: #fbfbfb;
}
/*--------------------------------------------------------------------------------------------*/
#form_password {
  display: flex;
  flex-direction: column;
  padding: 10px 0 30px 0;
}
#form_password h5 {
  font-size: 25px;
  max-width: 340px;
  border-bottom: 2px solid green;
  margin-bottom: 5px;
  font-weight: 600;
}
#form_password span {
  font-size: 17px;
  display: flex;
  flex-direction: column;
  padding: 10px 0 10px 0;
}
#form_password span input[type="password"] {
  max-width: 400px;
  margin: 8px 0 8px 0;
  padding: 5px;
  border-radius: 5px;
  outline: none;
  border: 2px solid grey;
  background-color: #fbfbfb;
}
/*--------------------------------------------------------------------------------------------*/
.error {
  color: red;
}
/*--------------------------------------------------------------------------------------------*/
.form_submission button {
  padding: 10px;
  width: 400px;
  font-size: 18px;
  outline: none;
  border: 2px solid#28A745;
  border-radius: 5px;
  background-color: #28a745;
  color: white;
}
.form_submission .logout {
  margin-top: 20px;
  border: 2px solid#007BFF;
  border-radius: 5px;
  background-color: #007bff;
}
/*--------------------------------------------------------------------------------------------*/
.slide-fade-enter-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
/*--------------------------------------------------------------------------------------------*/
@media only screen and (max-width: 460px) {
  .form_submission {
    display: flex;
    flex-direction: column;
    margin: 15px auto 0 auto;
  }
  .form_submission button {
    width: 180px;
  }
}
/*--------------------------------------------------------------------------------------------*/
</style>
