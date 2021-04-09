<template>
  <div id="container">
    <div id="stepProgress">
      <div class="step">
        <p class="step-text">1. Date</p>
        <!-- <div class="bullet">1</div> -->
      </div>
      <div class="step">
        <p class="step-text">2. Véhicule</p>
        <!-- <div class="bullet">2</div> -->
      </div>
      <div class="step">
        <p class="step-text">3. Options</p>
        <!-- <div class="bullet">3</div> -->
      </div>
      <div class="step last-step">
        <p class="step-text">4. Paiement</p>
        <!-- <div class="bullet">4</div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    //Get route name
    const route = this.$route.name;
    //Array of elements with the bullet class
    const bullets = [...document.querySelectorAll(".step")];
    var length = 0;
    //Define the length for the loop to complete step according to the current step
    if (route === "Offer") {
      length = 1;
    }
    if (route === "Location") {
      length = 2;
    }
    if (route === "LocationDetails") {
      length = 3;
    }
    if (route === "LocationConfirm") {
      length = 4;
    }
    //Loop through the array to add the completed class
    for (let i = 0; i < length; i++) {
      let currentBullet = bullets[i];
      currentBullet.classList.add("completed");
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
#stepProgress {
  display: flex;
  flex-direction: row;
}
.step {
  background-color: grey;
  text-align: center;
  display: flex;
  flex-direction: row-reverse;
  border-left: 1px solid #22223b;
  border-top: 1px solid #22223b;
  border-bottom: 1px solid #22223b;
  position: relative;
  margin: 2% 0% 2% 0;
  padding: 5px 20px 5px 30px;
  font-size: 18px;
  font-weight: bold;
}
.step::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  top: -1px;
  right: -20px;
  border-top: 24px solid transparent;
  border-bottom: 25px solid transparent;
  border-left: 20px solid #22223b;
  display: inline-block;
  z-index: 1;
}
.step-text {
  margin: 5px;
  color: black;
}
.step.completed {
  color: white;
  background-color: orange;
}
.step.completed::after {
  border-left: 20px solid #22223b;
}
.last-step {
  border-right: 1px solid #22223b;
}
.last-step::after {
  border: none;
}
@media only screen and (max-width: 670px) {
  #container {
    display: none;
    visibility: hidden;
  }
}
</style>
