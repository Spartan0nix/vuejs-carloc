<template>
  <div id="navbar">
    <button id="mobile-navigation" @click="navbarTogglerClick">
      <span class="mobile-nav"></span>
    </button>
    <ul class="content">
      <li class="links">
        <router-link to="/">Accueil</router-link>
      </li>

      <li class="links">
        <router-link to="/offer">Location</router-link>
      </li>

      <li class="links">
        <router-link to="/contact">Contact</router-link>
      </li>

      <div class="login" v-if="!currentUser">
        <router-link to="/login">Connexion</router-link>
      </div>

      <div class="login account" v-else>
        <b-button-toolbar
          aria-label="Toolbar with button groups and dropdown menu"
        >
          <b-dropdown class="mx-1" right text="Mon profil">
            <b-dropdown-item
              ><b-button to="/profile" class="Link"
                >Mon Profil</b-button
              ></b-dropdown-item
            >
            <b-dropdown-item v-show="role === 'Admin'"
              ><b-button to="/admin" class="Link"
                >Administration</b-button
              ></b-dropdown-item
            >
            <b-dropdown-item
              ><b-link @click="logout" class="Link Logout"
                >Déconnexion</b-link
              ></b-dropdown-item
            >
          </b-dropdown>
        </b-button-toolbar>
      </div>
    </ul>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  data() {
    return {
      popoverShow: false,
      role: ""
    };
  },
  methods: {
    navbarTogglerClick: function() {
      const navbarToggler = document.querySelector(".mobile-nav");
      const navbarMenu = document.querySelector(".content");

      navbarToggler.classList.toggle("open-mobile-nav");
      navbarMenu.classList.toggle("open");
    },
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (this.currentUser) {
      UserService.getUserRole()
        .then(response => {
          this.role = response.data.role[0].role_name;
        })
        .catch(err => {
          this.role = err;
        });
    }else{
      this.$store.dispatch("auth/logout");
    }
  }
};
</script>

<style scoped>
/*------------------------------------------------------------------------------------------------------------*/
* {
  margin: 0;
  padding: 0;
}
/*------------------------------------------------------------------------------------------------------------*/
#navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  font-size: 20px;
  background-color: #404040;
  transition: 1s all;
  z-index: 10;
}
#navbar li {
  list-style: none;
}
#navbar ul {
  width: 100%;
}
#navbar a {
  font-weight: bold;
  color: #d9d0dc;
  text-decoration: none;
}

#navbar a.router-link-exact-active {
  color: #42b983 !important;
  border-bottom: 1px solid #42b983;
}
/*------------------------------------------------------------------------------------------------------------*/
.content {
  padding: 15px;
  display: flex;
  flex-direction: row;
  transition: 1s all;
}
.content li {
  margin: 0 2%;
}
/*------------------------------------------------------------------------------------------------------------*/
.login {
  margin-left: auto;
}
.account {
  margin-right: 25px;
}
/*------------------------------------------------------------------------------------------------------------*/
#mobile-navigation {
  display: none;
  border: 1px solid white;
  background-color: transparent;
  cursor: pointer;
  padding: 0 5px;
  height: 40px;
}
/*------------------------------------------------------------------------------------------------------------*/
.mobile-nav,
.mobile-nav::after,
.mobile-nav::before {
  content: "";
  display: block;
  background-color: white;
  width: 25px;
  height: 3px;
  transition: 0.4s all;
}
.mobile-nav::after {
  transform: translateY(7px);
}
.mobile-nav::before {
  transform: translateY(-10px);
}

.mobile-nav.open-mobile-nav {
  background-color: transparent;
}
.mobile-nav.open-mobile-nav::after {
  transform: translateY(-5px) rotate(-45deg);
}
.mobile-nav.open-mobile-nav::before {
  transform: translateY(-2px) rotate(45deg);
}
/*------------------------------------------------------------------------------------------------------------*/
.Link {
  color: black !important;
  background-color: white !important;
  border: none !important;
}
.Logout {
  color: red !important;
  padding: 8px;
  border-radius: 5px;
  transition: 200ms ease-in;
}
.Logout:hover {
  background-color: red !important;
  color: white !important;
}
/*------------------------------------------------------------------------------------------------------------*/

@media only screen and (max-width: 900px) {
  #navbar {
    height: 70px;
    width: 100%;
  }
  .content {
    font-size: 40px;
    height: 100vh;
    max-height: 0;
    display: inline-block;
    visibility: hidden;
    text-align: center;
    background-color: #3e4e50;
    overflow: hidden;
    transition: 1s all;
  }
  .content.open {
    margin-top: 2%;
    visibility: visible;
    max-height: 100vh;
    transition: 1s all;
    padding-top: 5%;
  }
  .login a {
    margin-left: 2%;
  }
  #mobile-navigation {
    display: block;
    margin: 10px 30px auto auto;
    cursor: pointer;
  }
}
</style>
