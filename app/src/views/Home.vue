<template>
  <div class="home">
    <div class="title">
      <h1>
        Les meilleurs locations sont chez
        <span>Car-Loc</span>
      </h1>
    </div>
    <!--------------------------------------------------------------------------------------------------------------------------->
    <article class="content">
      <section id="item_a">
        <div>
          <h1>Qui Sommes-nous ?</h1>
          <p>
            Le Car-Loc est une entreprise de location automobile proposant des
            locations à des prix incomparables. Créée en 2010 notre entreprise
            propose des locations sur toute la France et a pour objectif de
            s’étendre à l'international. Notre philosophie, vous proposez des
            locations qui seront combler vos attentes. Nos experts sont
            disponibles 24h/7j pour répondre à vos questions via notre
            formulaire situé sous la rubrique "contact".
          </p>
        </div>
      </section>
      <!--------------------------------------------------------------------------------------------------------------------------->
      <section id="item_b">
        <div id="item_b_content">
          <div id="nosVehImg">
            <h1>Nos véhicules</h1>
          </div>
          <div id="item_b_text">
            <p>
              Nous nous engageons à vous fournir un service à la hauteur de vos
              exigences.
            </p>
            <p>
              Nous proposons des véhicules modernes allant de l’utilitaire au
              véhicule sportif.
            </p>
            <p>
              Tous nos véhicules passent par un nettoyage complet après chaque
              location et pour les plus longues, nous nous engageons à faire un
              "check-up" complet du véhicule.
            </p>
          </div>
        </div>
      </section>
      <!--------------------------------------------------------------------------------------------------------------------------->
      <section id="item_c">
        <div id="item_c_content">
          <h1>Témoignages</h1>
          <div class="Tem">
            <img src="../assets/Rooster.png" />
            <p>
              ‘’Un des service client les plus complets que j’ai pu expérimenter
              durant ma carrière.’’
            </p>
          </div>
          <div class="Tem">
            <img src="../assets/userMale.png" />
            <p>
              ‘’Les experts ont su me conseiller parfaitement, je recommande
              fortement ce site.’’
            </p>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {}
};
</script>

<style scoped>
/*----------------------------------------------------------------------------------------------*/
.title {
  font-size: 25px;
  width: 100%;
  padding-top: 80px;
  padding-bottom: 50px;
  line-height: 80px;
  text-align: center;
  color: white;
  background: url("../assets/Apropos.jpg");
  background-color: #000000;
  background-position: 100% 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
.title h1 {
  display: flex;
  flex-direction: column;
  padding: 80px;
}
.title h1 span {
  color: lightskyblue;
}
.content {
  box-sizing: border-box;
}
/*----------------------------------------------------------------------------------------------*/
#item_a {
  background-color: lightgrey;
  padding: 30px;
  font-size: 25px;
}
#item_a h1 {
  margin: 0 auto;
  font-size: 35px;
  margin-bottom: 15px;
  border-bottom: 2px solid grey;
  width: 350px;
}
#item_a div {
  margin: 0 auto;
  width: 70%;
  text-align: center;
}
/*----------------------------------------------------------------------------------------------*/
#item_b {
  background-color: grey;
}
#item_b_content {
  margin: 0 auto;
  width: 70%;
  display: grid;
  grid-template-columns: auto 55%;
  grid-gap: 0px;
}
#nosVehImg {
  height: 700px;
  background: url("../assets/NosVehic.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 100% 100%;
}
#nosVehImg h1 {
  margin: 8% auto 0 auto;
  font-size: 35px;
  color: white;
  border-bottom: 2px solid white;
  width: 240px;
}
#item_b_text {
  text-align: center;
  font-size: 25px;
  padding: 15px;
  width: auto;
  background-color: white;
  padding-top: 10%;
}
#item_b_text p {
  margin: 50px;
  padding-bottom: 12px;
  border-bottom: 1.5px solid lightblue;
}
/*----------------------------------------------------------------------------------------------*/
#item_c {
  background: orange;
  padding-top: 2%;
  padding-bottom: 3%;
}
#item_c_content {
  display: grid;
  grid-template-columns: 50% 50%;
  margin: 0 auto;
  width: 60%;
  grid-gap: 0px;
}
#item_c_content h1 {
  grid-column: 1/3;
  text-align: center;
  padding: 10px;
  font-size: 30px;
}
.Tem {
  text-align: center;
  font-size: 20px;
  font-style: italic;
  font-weight: normal;
  padding: 10px;
  border-top: 2px solid black;
  background-color: rgba(0, 0, 0, 0.144);
  color: black;
}
.Tem img {
  height: 100px;
  margin: 10px;
  width: 100px;
  border: 2px solid lightblue;
  background-color: lightblue;
  padding: 10px;
  border-radius: 40%;
}
.Tem:nth-child(2) {
  border-right: 2px solid black;
}
/*----------------------------------------------------------------------------------------------*/
@media only screen and (max-width: 1170px) {
  #nosVehImg {
    background: none;
    height: 80px;
    margin: 1% auto 0 auto;
  }
  #item_b_content {
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 0px;
    background-color: white;
  }
  #item_b_content h1 {
    color: black;
    margin-bottom: -450px;
  }
  #item_b_text {
    padding-top: 0;
  }
  #item_b_text p {
    margin: 50px;
    margin-top: 20px;
  }
}
/*----------------------------------------------------------------------------------------------*/
</style>
