<template>
  <div id="container">
    <section id="header">
      <h2>Créer votre compte</h2>
    </section>
    <form name="form" @submit.prevent="handleLogin">
      <section id="content">
        <div id="name">
          <span>
            <label for="lastname"><strong>Nom :</strong></label>
            <input
              v-validate="{ required: true, regex: /^[^0-9()]+$/ }"
              name="lastname"
              type="text"
              v-model="user.lastname"
            />
            <span class="error" v-show="errors.first('lastname')"
              >Prénom non-valide</span
            >
          </span>
          <span>
            <label for="firstname"><strong>Prénom :</strong></label>
            <input
              v-validate="{ required: true, regex: /^[^0-9()]+$/ }"
              name="firstname"
              type="text"
              v-model="user.firstname"
            />
            <span class="error" v-show="errors.first('firstname')"
              >Prénom non-valide</span
            >
          </span>
        </div>
        <span>
          <label for="email"><strong>Adresse Mail :</strong></label>
          <input
            v-validate="'required|email'"
            name="email"
            type="text"
            v-model="user.email"
          />
          <span class="error" v-show="errors.first('email')"
            >Adresse email non-valide</span
          >
        </span>
        <span>
          <label for="username"><strong>Nom d'utilisateur :</strong></label>
          <input
            v-validate="{
              required: true,
              regex: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/,
              max: 20,
              min: 3
            }"
            name="username"
            type="text"
            v-model="user.username"
          />
          <span class="error" v-show="errors.first('username')"
            >Nom non-valide</span
          >
        </span>
        <span>
          <label for="password"><strong>Mot de passe :</strong></label>
          <input
            v-validate="{ required: true, min: 5, max: 40 }"
            name="password"
            type="password"
            :class="{ 'is-danger': errors.has('password') }"
            ref="password"
          />
          <span v-show="errors.has('password')" class="help is-danger error"
            >5 caractères minimum<br />40 caractères maximum</span
          >
        </span>
        <input type="submit" id="submit" value="Confirmer" />
      </section>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        password: "",
        roles: ["utilisateur"]
      },
      loading: false,
      message: ""
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (
          this.user.lastname &&
          this.user.firstname &&
          this.user.username &&
          this.user.password &&
          this.user.email
        ) {
          this.$store.dispatch("auth/register", this.user).then(
            () => {
              this.$router.push("/login");
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
    }
  }
};
</script>

<style scoped>
/*---------------------------------------------------------------*/
* {
  margin: 0;
  padding: 0;
}
/*---------------------------------------------------------------*/
#container {
  margin: 100px auto;
  width: 750px;
  border: 2px solid #403758;
}
/*---------------------------------------------------------------*/
#header {
  padding: 40px 0 40px 30px;
  background-color: #c5cac6;
  border-bottom: 2px solid #403758;
}
/*---------------------------------------------------------------*/
.error {
  color: red;
  margin-top: 15px;
}
/*---------------------------------------------------------------*/
#name {
  display: flex;
  flex-direction: row;
}
#name span {
  display: flex;
  flex-direction: column;
}
#name input[type="text"] {
  width: 250px;
}
#content {
  display: flex;
  flex-direction: column;
  text-align: justify;
  padding: 20px 0 20px 0;
  background-color: #f0f2f1;
}
#content span {
  margin: 15px 5%;
  width: 300px;
}
#content span p {
  font-size: 18px;
}
input[type="text"],
input[type="password"] {
  width: 500px;
  margin-top: 12px;
  border: 1px solid grey;
  border-radius: 10px;
  font-size: 22px;
  outline: none;
  transition: all 500ms;
  padding: 5px;
}
input[type="text"]:focus,
input[type="password"]:focus {
  border: 1px solid #3ad831;
}
#submit {
  margin: 5% auto;
  padding: 8px 0 8px 0;
  width: 200px;
  font-size: 22px;
  border: 1px solid grey;
  border-radius: 10px;
  background-color: #3ad831;
  color: black;
  transition: all 600ms;
}
#submit:hover {
  background-color: black;
  color: #3ad831;
  border: 1px solid #3ad831;
}
/*---------------------------------------------------------------*/
@media only screen and (max-width: 780px) {
  #container {
    width: 95%;
  }
  #name {
    display: flex;
    flex-direction: column;
  }
  #content span {
    margin: 15px 20px;
    width: 300px;
  }
}
@media only screen and (max-width: 580px) {
  #content span {
    margin: 15px 20px 15px 20px;
  }
  input[type="text"],
  input[type="password"] {
    width: 250px;
  }
}
/*---------------------------------------------------------------*/
</style>
