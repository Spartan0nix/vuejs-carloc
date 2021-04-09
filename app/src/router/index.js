import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  /*------------------------------------------------Step_Location-----------------------------------------------------------------*/
  {
    path: "/offer",
    name: "Offer",
    component: () =>
      import(
        /* webpackChunkName: "Step1_date" */ "../views/rentStep/step1_date.vue"
      )
  },
  {
    path: "/location",
    name: "Location",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "Step2_rents" */ "../views/rentStep/step2_rents.vue"
      )
  },
  {
    path: "/location/:id/:rent",
    name: "LocationDetails",
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "Step3_details" */ "../views/rentStep/step3_details.vue"
      )
  },
  {
    path: "/location/:id/:rent/confirm",
    name: "LocationConfirm",
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "Step4_confirm" */ "../views/rentStep/step4_confirm.vue"
      )
  },
  /*------------------------------------------------------------------------------------------------------------------------------*/
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/auth/connexion.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "Register" */ "../views/auth/register.vue")
  },
  {
    path: "/profile",
    name: "profiles",
    component: () =>
      import(/* webpackChunkName: "Profile" */ "../views/client/Profile.vue")
  },
  /*------------------------------------------------------------------------------------------------------------------------------*/
  {
    path: "/location/:id/:rent/paiement",
    name: "payementMethod",
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "PayementMethod" */ "../views/payement/step1_chooseMethod"
      )
  },
  {
    path: "/location/:id/:rent/confirm",
    name: "ConfirmRent",
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "ConfirmRent" */ "../views/payement/step2_finish"
      )
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
