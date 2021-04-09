<template>
  <div class="wrapper">
    <span id="progress-bar"><progressBar /></span>
    <div class="main">
      <form @submit.stop.prevent="sumbitClick">
        <h2>Rechercher les locations disponibles</h2>
        <h4><i>Les meilleurs prix</i></h4>
        <hr />
        <article class="input-user">
          <div class="office-select">
            <p>Agence de Départ</p>
            <input
              type="text"
              v-model="search"
              autocomplete="off"
              @click="modal = !modal"
              required
            />
            <ul v-if="suggestReturn && modal" class="suggest">
              <li
                v-for="suggest in suggestReturn"
                :key="suggest.idoffice"
                @click="setOffice(suggest)"
              >
                - {{ suggest.street }} {{ suggest.city_name }},
                {{ suggest.city_code }}
              </li>
            </ul>
          </div>
          <div class="date-select">
            <span>
              <p>Début de la location</p>
              <input type="date" :min="today" v-model="start_date" required />
            </span>
            <span>
              <p>Fin de la location</p>
              <input type="date" :min="today" v-model="end_date" required />
            </span>
          </div>
        </article>
        <hr />
        <article class="submit-user">
          <input type="submit" value="Rechercher" />
          <div class="error" style="display:none">
            <p>Erreur lors de la sélection des dates.</p>
            <p>
              Pensez à vérifier que la date de départ et bien inférieur à celle
              de fin.
            </p>
          </div>
        </article>
      </form>
    </div>
  </div>
</template>

<script>
import progressBar from "@/components/ProgressBar";

export default {
  data() {
    return {
      //rent start date
      start_date: "",
      //rent end date
      end_date: "",
      //string provide by user to find an office
      search: "",
      //set the visibility of the modal to find suggestion
      modal: false,
      //Array of office find using search info provide by the user
      suggestReturn: [],
      //office ID
      office: 0
    };
  },
  components: {
    progressBar
  },
  computed: {
    today() {
      //User is unable to select a date anterior
      var today = new Date();
      var dd = today.getDate() + 1; //Start from tomorrow
      var mm = today.getMonth() + 1; //January is 0!
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      today = yyyy + "-" + mm + "-" + dd;
      // today = yyyy+'-'+mm+'-'+dd+"T00:00:00";
      return today;
    }
  },
  methods: {
    sumbitClick() {
      if (this.start_date < this.end_date) {
        const datePackage = {
          //Set the office id, start and end date of the rent
          start: this.start_date,
          end: this.end_date,
          office: this.office
        };
        sessionStorage.setItem("date", JSON.stringify(datePackage)); //User date selected saved in the localStorage.
        this.$router.push("/location"); //redirect to location page
      } else {
        document.querySelector(".error").style.display = "block";
        return false;
      }
    },
    setOffice(suggest) {
      //Display selected suggestion in the user input
      this.search =
        suggest.street + " " + suggest.city_name + " " + suggest.city_code;
      //Set the office id associate in office var
      this.office = suggest.idoffice;
      //Disable the visibility of the modal
      this.modal = false;
    }
  },
  watch: {
    search() {
      //Search only if more than two character are provided
      if (this.search.length > 2) {
        //Vuex action call
        this.$store.dispatch("fetchSuggest", this.search);
        //Stored data return by getter
        this.suggestReturn = this.$store.getters.GET_OFFICES;
      } else if (this.search.length == 0) {
        //If 0 character are provided, reset suggestReturn
        this.suggestReturn = [];
      }
    }
  }
};
</script>

<style scoped>
/*---------------------------------------------------------------------------------------------*/
* {
  margin: 0;
  padding: 0;
}
.wrapper {
  background-color: #b1c2d2;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}
#progress-bar {
  margin: 100px 0 0 50px;
}
.main {
  border: 2px solid grey;
  margin: 5em auto;
  width: 1000px;
  padding: 15px;
  background-color: #e5f0f0;
}
form {
  display: flex;
  flex-direction: column;
}
hr {
  border-top: 1.4px solid grey;
  margin: 10px 0;
}
/*---------------------------------------------------------------------------------------------*/
.input-user {
  display: flex;
  flex-direction: row;
}
.office-select {
  font-size: 20px;
  flex: 1;
  padding: 23px 20px 15px 20px;
}
.office-select input[type="text"] {
  width: 100%;
  padding: 5px;
  font-size: 15px;
}
.office-select p {
  margin: 0;
}
.date-select {
  display: flex;
  flex-direction: row;
  font-size: 20px;
  padding: 15px;
}
.date-select span {
  margin: 8px 20px 8px 20px;
}
.date-select span p {
  margin: 0;
}
.suggest {
  position: absolute;
  margin-top: 8px;
  background-color: white;
  border: 2px solid grey;
  height: 150px;
  width: 450px;
  overflow: hidden;
}
.suggest li {
  list-style: none;
  padding: 10px;
}
.suggest li:hover {
  cursor: pointer;
  background-color: lightgreen;
}
/*---------------------------------------------------------------------------------------------*/
.submit-user {
  text-align: center;
}
.submit-user input[type="submit"] {
  border: none;
  padding: 10px 30px 10px 30px;
  margin: 25px 0 5px 0px;
  font-size: 20px;
  background-color: orange;
  border: 2px solid orange;
  color: black;
  transition: 0.4s all;
}
.submit-user input[type="submit"]:hover {
  transform: scale(1.05);
  box-shadow: 5px 5px 5px grey;
}
/*---------------------------------------------------------------------------------------------*/
.error {
  text-align: center;
  padding: 10px;
  margin: 10px 0;
  color: red;
}
.error p {
  margin: 2% 0;
}
/*---------------------------------------------------------------------------------------------*/
@media only screen and (max-width: 1005px) {
  .main {
    width: 98%;
  }
  .input-user {
    display: flex;
    flex-direction: column;
  }
  .date-select {
    border-top: none;
  }
}
@media only screen and (max-width: 535px) {
  .date-select {
    display: flex;
    flex-direction: column;
  }
}
/*---------------------------------------------------------------------------------------------*/
</style>
