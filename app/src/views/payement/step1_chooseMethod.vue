<template>
  <div id="container">
    <div>
      <b-button type="submit" size="lg" variant="primary" @click="payement">Confirmer le payement</b-button>
    </div>
    <div v-if="errMessage">
      {{errMessage}}
    </div>
  </div>
</template>

<script>
import RentService from '../../services/rent.service';

export default {
  data() {
    return {
      rent_data: {
        start_date: "",
        end_date: "",
        idOffice: "",
        total_price: this.totalPrice,
        idrent: this.id
      },
      message: '',
      errMessage: ''
    };
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    },
    options: {
      type: Array
    },
    totalPrice: {
      type: [Number, String],
      required: true
    }
  },
  methods: {
    payement() {
      if(this.currentUser){
        RentService.updateRent(this.rent_data)
        .then(response => {
          this.message = response.data.message;
          this.$router.push({ name: 'ConfirmRent', params: { message: this.message } })
        })
        .catch(err => {
          this.errMessage = err.response;
        });
      }
    }
  },
  mounted() {
    if(!this.id || !this.totalPrice) {
      this.$router.go(-1);
    }
    if (this.currentUser) {
      const value = JSON.parse(sessionStorage.getItem("date"));
      this.rent_data.start_date = value.start;
      this.rent_data.end_date = value.end;
      this.rent_data.idOffice = value.office;
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
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
#container {
  margin: 15% 0;
}
#container button {
  margin-left: 40%;
}
/*---------------------------------------------------------------------------------------------*/
</style>
