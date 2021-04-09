<template>
  <div id="wrapper">
    <div id="Rent">
      <progressBar />
      <h1>Nos Locations</h1>
      <section v-for="rent in rents" :key="rent.idrent" class="rent">
        <div class="rent_image">
          <img
            :src="rent.image"
            alt="https://unsplash.com/a/img/empty-states/photos.png"
          />
        </div>
        <div class="rent_content">
          <h2>{{ rent.name }}</h2>
          <div class="rent_details">
            <p>Puissance : {{ rent.horsepower }} Cv</p>
            <p>Véhicule {{ rent.fuel }}</p>
            <p>{{ rent.type_name }}</p>
          </div>
          <!-- Can be rented -->
          <div class="payement" v-if="rent.refstatus === 1">
            <router-link
              :to="{
                name: 'LocationDetails',
                params: { id: rent.refcar, rent: rent.name }
              }"
            >
              <button>
                Payer en ligne <br />
                <span>{{ rent.daily_price }}€ pour 1 jour</span>
              </button>
            </router-link>
          </div>
          <!-- Cannot be rented -->
          <div v-else>
            <button class="disabledButton">
              <span>Indisponible pour le moment</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import progressBar from "@/components/ProgressBar";

export default {
  data() {
    return {
      locations: []
    };
  },
  components: {
    progressBar
  },
  mounted() {
    this.$store.dispatch("fetchRent");
  },
  computed: {
    rents() {
      return this.$store.getters.GET_RENT;
    }
  }
};
</script>

<style scoped>
/*-------------------------------------------------------------------------------*/
* {
  margin: 0;
  padding: 0;
}
#Rent {
  width: 80%;
  margin: 0 auto;
  padding: 2%;
  padding-top: 90px;
  background-color: #e5f0f0;
}
img {
  max-width: 500px;
  height: auto;
  width: 100%;
  max-height: 400px;
}
/*-------------------------------------------------------------------------------*/
.rent_image {
  margin-left: 5%;
  margin: 2% 0;
}
.rent {
  margin: 4%;
  display: flex;
  flex-direction: row;
  border-top: 1px solid grey;
}
.rent_content {
  width: 48%;
  text-align: center;
  padding: 20px;
  margin: 2% 0 2% 4%;
}
.rent_content h4 {
  font-size: 20px;
  font-style: italic;
}
.rent_details {
  border: 1px solid black;
  border-radius: 4%;
  text-align: justify;
  width: 200px;
  margin: 4% auto;
  padding: 14px;
  padding-bottom: 0px;
  background-color: #b1c2d2;
}
.payement button {
  border: 2px solid #2e4052;
  width: 300px;
  margin: 0 auto;
  padding: 8px;
  background-color: #2e4052;
  color: orange;
  font-weight: bold;
  padding: 10px;
  font-size: 20px;
  transition: 0.4s ease-in-out;
}
.payement button:hover {
  background-color: white;
  border-color: orange;
  color: #2e4052;
  cursor: pointer;
}
.disabledButton {
  background-color: lightgray;
  border: 2px solid red;
  width: 300px;
  margin: 0 auto;
  padding: 8px;
  color: black;
  padding: 10px;
  font-size: 20px;
}
@media only screen and (max-width: 1460px) {
  .rent_content h4 {
    font-size: 20px;
  }
}
@media only screen and (max-width: 1250px) {
  .rent_details {
    width: 60%;
  }
  .rent {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0;
  }
  .rent_image {
    margin: 4% auto;
  }
  .rent_content {
    margin: 0 auto;
  }
  .rent_content h2 {
    font-size: 28px;
  }
  .rent_content h4 {
    margin: 4% auto;
    width: auto;
    text-align: center;
  }
  .rent_details {
    margin: 5% auto;
    padding: 10px;
  }
  .payement button {
    margin: 3% auto;
  }
}
@media only screen and (max-width: 1070px) {
  .rent_content h4 {
    font-size: 15px;
  }
  #Rent {
    width: 100%;
  }
}
@media only screen and (max-width: 800px) {
  #Rent {
    width: 100%;
  }
  .rent_content {
    width: auto;
    margin: 0;
    text-align: justify;
  }
  .rent_details {
    margin: 5% 0;
    width: 200px;
  }
  .rent_content h2 {
    border-bottom: 2px solid green;
  }
  .rent_content h4 {
    text-align: justify;
    font-size: 20px;
    width: 80%;
    margin: 6% 0 6% 0;
  }
  .payement {
    width: 60%;
    margin: 5% 0 5% 0;
  }
}
/*-------------------------------------------------------------------------------*/
</style>
