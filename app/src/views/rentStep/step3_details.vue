<template>
  <div id="main">
    <!-- <link rel="stylesheet"> -->
    <div id="progress">
      <span>
        <progressBar />
      </span>
    </div>
    <section id="mainContent">
      <article id="img_options_content">
        <div id="img">
          <img :src="location.image" alt="Image non disponible" />
        </div>
        <div id="options">
          <h2>Les options disponibles</h2>
          <ul v-for="option in options" :key="option.id">
            <label>
              <input
                type="checkbox"
                id="chekbox"
                :value="option.id"
                v-model="optionSelected"
              />
              {{ option.name }}
            </label>
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
      </article>
      <article id="details_content">
        <div id="rent_details">
          <h2>{{ location.brand_name }} {{ location.model_name }}</h2>
          <h4>{{ location.type_name }}</h4>
          <p id="description">{{ location.description }}</p>
          <p><span>Puissance :</span> {{ location.horsepower }} Chevaux</p>
          <p><span>Type de carburant :</span> {{ location.fuel }}</p>
          <p><span>Proposé en : </span>{{ location.color }}</p>
          <p><span>Type de boite :</span> {{ location.gearbox }}</p>
        </div>
        <div id="confirm-field">
          <div id="date-field">
            <p>
              Durée de la location : <strong>{{ dayNumber }} jours</strong>
            </p>
            <p>
              Prix total: <strong> {{ price }} € </strong>
            </p>
          </div>
          <hr class="separator" />
          <div id="btn-field">
            <span id="GoBack"><GoBack /></span>
            <span id="confirm-btn">
              <b-button variant="primary" size="lg">
                <router-link
                  :to="{
                    name: 'LocationConfirm',
                    params: {
                      id: location.refcar,
                      rent: location.name,
                      option: this.optionSelected,
                      totalPrice: price,
                      date: this.dayNumber
                    }
                  }"
                >
                  Confirm
                </router-link>
              </b-button>
            </span>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import store from "@/store.js";
import GoBack from "@/components/GoBack.vue";
import progressBar from "@/components/ProgressBar";

export default {
  data() {
    return {
      optionSelected: [],
      dayNumber: null
    };
  },
  components: {
    GoBack,
    progressBar
  },
  props: {
    id: {
      type: [Number, String],
      required: true
    },
    rent: {
      type: String,
      required: true
    }
  },
  created() {
    this.$store.dispatch("fetchCar", this.id);
    /*-------------------------------------------------------*/
    //calcul the number of day between the selected dates
    const date = JSON.parse(sessionStorage.getItem("date"));
    //create new Date using stored one
    var start_date = new Date(date.start);
    var end_date = new Date(date.end);
    //calcul the time difference between two date => result in milliseconds; must be converted
    var time_difference = end_date.getTime() - start_date.getTime();
    //convert milliseconds difference in day difference
    var day_difference = time_difference / (1000 * 3600 * 24);
    //stored the difference
    this.dayNumber = day_difference;
  },
  computed: {
    options() {
      return store.options;
    },
    location() {
      return this.$store.getters.GET_RENT[0];
    },
    price() {
      if (this.dayNumber > 1) {
        var currentPrice = this.$store.getters.GET_RENT[0].daily_price;
        var totalPrice = (currentPrice - currentPrice * 0.1) * this.dayNumber;
      } else {
        totalPrice = this.$store.getters.GET_RENT[0].daily_price;
      }
      return totalPrice;
    }
  },
  methods: {}
};
</script>

<style scoped>
/*------------------------------------------------------------------------------*/
template {
  display: flex;
  flex-direction: column;
}
#progress {
  width: 100%;
  min-height: 155px;
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
  max-width: 650px;
  max-height: 550px;
}
/*------------------------------------------------------------------------------*/
#mainContent {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  padding: 1em;
  background-color: #e5f0f0;
}
#btnField {
  width: 80%;
  margin: 0 auto;
  height: 150px;
}
/*------------------------------------------------------------------------------*/
#img_options_content {
  width: 48%;
  height: auto;
  margin: 1% auto;
  padding: 1%;
  display: flex;
  flex-direction: column;
}
#details_content {
  width: 48%;
  height: 90%;
  margin: 1% auto;
  padding: 1%;
}
/*------------------------------------------------------------------------------*/
#img {
  border: 2px solid grey;
  width: 90%;
  height: auto;
  margin: 2% auto;
}
#options {
  border: 2px solid grey;
  border-radius: 10px;
  width: 90%;
  height: 60%;
  margin: 2% auto;
  text-align: justify;
  padding: 20px;
  background-color: #ebe9ec;
}
#options h2 {
  font-size: 30px;
  border-bottom: 2px solid #a79bc0;
  margin-bottom: 7%;
}
#options ul {
  margin: 5%;
  font-size: 20px;
}
/*------------------------------------------------------------------------------*/
#rent_details {
  border: 2px solid grey;
  border-radius: 10px;
  width: 80%;
  height: 80%;
  margin: 2% auto;
  text-align: justify;
  padding: 30px;
  background-color: #ebe9ec;
}
#rent_details h2 {
  font-size: 30px;
  border-bottom: 2px solid #a79bc0;
}
#rent_details h4 {
  font-size: 20px;
  font-weight: normal;
  margin: 2% 0;
}
#rent_details p {
  margin: 20px;
  font-size: 20px;
}
#rent_details p span {
  font-weight: bold;
  font-size: 22px;
}
#description {
  padding: 10px;
  font-style: italic;
  background-color: lightblue;
  color: black;
}
/*------------------------------------------------------------------------------*/
#confirm-field {
  margin: 3% auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  border: 2px solid grey;
  border-radius: 10px;
  padding: 15px;
}
#confirm-field a {
  color: white;
}
#date-field {
  text-align: center;
  font-size: 22px;
}
#date-field p {
  margin: 0;
}
hr.separator {
  border-top: 1px solid #a79bc0;
  margin: 3% 0;
}
#btn-field {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 20px;
}
#GoBack {
  margin: auto 0;
}
#confirm-btn {
  margin: auto 0;
}
/*------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------*/
@media only screen and (max-width: 1390px) {
  #mainContent {
    width: 100%;
  }
  #rent_details {
    margin: 0;
    width: 100%;
  }
  #img_options_content {
    margin: 0;
  }
}
@media only screen and (max-width: 1120px) {
  #options h2 {
    font-size: 25px;
  }
  #options ul {
    font-size: 18px;
  }
  #rent_details p {
    font-size: 18px;
  }
}
@media only screen and (max-width: 900px) {
  #mainContent {
    display: flex;
    flex-direction: column;
  }
  #img_options_content {
    margin: 0 auto;
    width: 80%;
  }
  #options h2 {
    font-size: 30px;
  }
  #options ul {
    font-size: 22px;
  }
  #details_content {
    width: 80%;
  }
  #rent_details p {
    font-size: 22px;
  }
}
@media only screen and (max-width: 550px) {
  #img_options_content {
    margin: 0 auto;
    width: 100%;
  }
  #options {
    margin: 8% auto;
  }
  #options h2 {
    font-size: 24px;
  }
  #options ul {
    font-size: 18px;
  }
  #details_content {
    width: 100%;
  }
  #description {
    width: 100%;
  }
  #rent_details p {
    margin: 5% 0;
    font-size: 20px;
  }
}
/*------------------------------------------------------------------------------*/
</style>
