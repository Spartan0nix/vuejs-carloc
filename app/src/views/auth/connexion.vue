<template>
  <div id="container">
    <section id="header">
      <h2>Connectez-vous</h2>
      <h6>Entrez votre nom d'utilisateur et votre mot de passe</h6>
    </section>
    <form name="form" @submit.prevent="handleLogin">
      <section id="content">
        <span>
          <label for="username"
            ><strong>Entrez votre nom d'utilisateur :</strong></label
          >
          <input v-model="user.username" required type="text" name="username" />
        </span>
        <span>
          <label for="password"
            ><strong>Entrez votre mot de passe :</strong></label
          >
          <input
            v-model="user.password"
            required
            type="password"
            name="password"
          />
        </span>
        <input type="submit" id="submit" value="Confirmer" />
        <p>
          Pas de compte ?
          <router-link to="/register">
            Créer un compte.
          </router-link>
        </p>
      </section>
    </form>
  </div>
</template>

<script>
// import User from '../../models/User';

export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
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

        if (this.user.username && this.user.password) {
          this.$store.dispatch("auth/login", this.user).then(
            () => {
              this.$router.push("/profile");
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
#content {
  display: flex;
  flex-direction: column;
  text-align: justify;
  padding: 20px 0 20px 0;
  background-color: #f0f2f1;
}
#content span {
  margin: 15px auto;
  width: 300px;
}
#content p {
  font-size: 18px;
  margin-left: 20px;
}
input[type="text"],
input[type="password"] {
  width: 300px;
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
  width: 350px;
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
@media only screen and (max-width: 785px) {
  #container {
    width: 95%;
  }
}
@media only screen and (max-width: 335px) {
  input[type="text"],
  input[type="password"] {
    width: 90%;
    margin: 10px 0 10px 10px;
  }
  #content p {
    font-size: 16px;
    margin-left: 15px;
  }
}
/*---------------------------------------------------------------*/
</style>
