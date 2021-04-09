<template>
  <main>
    <div id="progress">
      <span>
        <progressBar />
      </span>
    </div>
    <h1>Récapitulatif</h1>
    <div id="content">
      <div id="car">
        <h3>Le Véhicule</h3>
        <hr />
        <h5>
          {{ location.name }}, <i>{{ location.type_name }}</i>
        </h5>
        <div id="car_content">
          <p>
            Puissance : <strong>{{ location.horsepower }} Chevaux</strong>
          </p>
          <p>
            Couleur : <strong>{{ location.color }}</strong>
          </p>
          <p>
            Véhicule : <strong>{{ location.gearbox }}</strong>
          </p>
          <p>
            Carburant : <strong>{{ location.fuel }}</strong>
          </p>
        </div>
      </div>
      <div id="image">
        <img :src="location.image" alt="Image non disponible" />
      </div>
      <div id="options">
        <h3>Les options choisis</h3>
        <hr />
        <ul v-for="option in options" :key="option.id">
          {{
            option.name
          }}
          <div>
            <b-button
              class="py-1"
              v-b-popover.focus="option.description"
              variant="info"
              >Plus de détails</b-button
            >
          </div>
        </ul>
      </div>
    </div>
    <div id="btn-field">
      <div id="price">
        <h4>Prix total : {{ totalPrice }} €</h4>
        <h6>Durée de la location : {{ date }} jours</h6>
      </div>
      <div id="btn">
        <span id="GoBack"><GoBack /></span>
        <span id="confirm-btn">
          <!-- If the currentUser is not identify => Display a modal to login-->
          <b-button
            type="submit"
            size="lg"
            variant="primary"
            v-b-modal.modal-prevent-closing
            v-if="!currentUser"
          >
            J'accepte les conditions et les tarifs
          </b-button>
          <!-- If the currentUser is identify -->
          <b-button
            type="submit"
            size="lg"
            variant="primary"
            @click="connectedUser"
            v-else
          >
            J'accepte les conditions et les tarifs
          </b-button>
          <!-- Modal to allow the user to logIn -->
          <b-modal
            id="modal-prevent-closing"
            ref="modal"
            title="Identifiez-vous avec votre compte."
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
          >
            <form ref="form" @submit.stop.prevent="logIn">
              <b-form-group
                :state="nameState"
                label="Nom d'utilisateur"
                label-for="username"
                invalid-feedback="Nom d'utilisateur requis"
              >
                <b-form-input
                  id="username"
                  v-model="user.username"
                  :state="nameState"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                :state="nameState"
                label="Mot de passe"
                label-for="password"
                invalid-feedback="Nom de passe requis"
              >
                <b-form-input
                  id="password"
                  v-model="user.password"
                  :state="nameState"
                  type="password"
                  required
                ></b-form-input>
              </b-form-group>
            </form>

            <b-form-group>
              <b-link :to="{ path: '/register' }">Créer un compte. </b-link>
              Vous perderez toutes progressions.
            </b-form-group>
          </b-modal>
        </span>
      </div>
    </div>
  </main>
</template>

<script>
import GoBack from "@/components/GoBack.vue";
import progressBar from "@/components/ProgressBar";
import store from "@/store.js";

export default {
  data() {
    return {
      nameState: null,
      user: {
        username: "",
        password: ""
      }
    };
  },
  components: {
    GoBack,
    progressBar
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    },
    rent: {
      type: String,
      required: true
    },
    option: {
      type: Array
    },
    totalPrice: {
      type: [Number, String],
      required: true
    },
    date: {
      type: Number,
      required: true
    }
  },
  created() {
    this.$store.dispatch("fetchCar", this.id);

    if (!this.date || !this.option || !this.totalPrice) {
      this.$router.go(-1);
    }
  },
  computed: {
    location() {
      return this.$store.getters.GET_RENT[0];
    },
    options() {
      return this.option.map(id => {
        return store.options.find(options => options.id === id);
      });
    },
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    resetModal() {
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.logIn();
    },
    logIn() {
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          return;
        }

        if (this.user.username && this.user.password) {
          this.$store.dispatch("auth/login", this.user).then(
            () => {
              this.$router.push({
                name: "payementMethod",
                params: {
                  id: this.id,
                  rent: this.rent,
                  option: this.option,
                  totalPrice: this.totalPrice,
                  date: this.date
                }
              });
            },
            error => {
              console.log(error);
            }
          );
        }
      });
    },
    connectedUser() {
      if (this.currentUser) {
        this.$router.push({
          name: "payementMethod",
          params: {
            id: this.id,
            rent: this.rent,
            option: this.option,
            totalPrice: this.totalPrice,
            date: this.date
          }
        });
      }
    }
  }
};
</script>

<style scoped>
/*------------------------------------------------------------------------------*/
template {
  display: flex;
  flex-direction: column;
}
main h1 {
  text-align: center;
  margin-top: 40px;
}
#progress {
  width: 100%;
  height: 155px;
  background-color: #e5f0f0;
  border-bottom: 1px solid grey;
}
#progress span {
  position: absolute;
  top: 70px;
  left: 30px;
}
img {
  width: 100%;
  height: auto;
  max-width: 450px;
  max-height: 400px;
}
#content {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 50px;
}
#image {
  margin: auto 0;
}
hr {
  border-top: 0.1px solid;
}
/*------------------------------------------------------------------------------*/
#car {
  border: 2px solid grey;
  box-shadow: 8px 8px 10px grey;
  /* width: 30%; */
  text-align: center;
  padding: 20px;
  transition: 0.6s all;
  margin: 0 auto;
}
h3 {
  font-size: 33px;
  margin: 1% 0 5% 0;
}
#car h5 {
  width: 270px;
  font-size: 23px;
  border-bottom: 2px solid#A79BC0;
  margin: 3% 10px;
}
#car_content {
  text-align: justify;
  font-size: 20px;
  margin: 4% 10px;
}
#car:hover {
  cursor: pointer;
  transform: scale(1.05);
  box-shadow: 12px 15px 12px #5e656e;
}
/*------------------------------------------------------------------------------*/
#options {
  border: 2px solid grey;
  box-shadow: 8px 8px 10px grey;
  /* width: 30%; */
  text-align: center;
  padding: 20px;
  transition: 0.6s all;
  margin: 0 auto;
}
#options ul {
  font-size: 20px;
  text-align: justify;
  margin: 4% 10px;
}
#options:hover {
  cursor: pointer;
  transform: scale(1.05);
  box-shadow: 12px 15px 12px #5e656e;
}
/*------------------------------------------------------------------------------*/
#btn-field {
  border: 2px solid lightgrey;
  border-radius: 6px;
  width: 600px;
  padding: 20px;
  margin: 6% auto;
  display: flex;
  flex-direction: column;
}
#btn {
  margin: 20px 0 5px 16px;
}
#btn span {
  margin: 8px;
}
#confirm-btn button a {
  color: white;
}
/*------------------------------------------------------------------------------*/
@media only screen and (max-width: 1110px) {
  img {
    max-width: 300px;
  }
}
@media only screen and (max-width: 960px) {
  img {
    max-width: 450px;
  }
  #content {
    display: flex;
    flex-direction: column;
  }
  #image {
    text-align: center;
    margin: 30px auto;
  }
}
@media only screen and (max-width: 625px) {
  #btn-field {
    width: 100%;
  }
  #btn {
    display: flex;
    flex-direction: column;
    margin: 0;
    text-align: center;
  }
  #btn span {
    margin: 6px auto 6px auto;
    max-width: 250px;
  }
}
/*------------------------------------------------------------------------------*/
</style>
