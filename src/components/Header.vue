<template>
  <b-navbar v-show="loggedIn" class='card-2' toggleable="lg" type="light" variant="light">
    <b-navbar-brand href="#">{{pageName}}</b-navbar-brand>

    <b-navbar-toggle target="nav_collapse" />

    <b-collapse is-nav id="nav_collapse">

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">


        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content"><em>{{this.firstName}}</em></template>

          <b-dropdown-item v-on:click="settingsButtonClicked">Settings</b-dropdown-item>
          <b-dropdown-item v-on:click="signoutButtonClicked">Signout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>

  </b-navbar>

</template>

<script>
  import BootstrapVue from 'bootstrap-vue'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import {FirebaseAuthenticationAPI} from "@/services/FirebaseAuthenticationAPI"
  import Vue from 'vue'
  // import Settings from "@/components/Settings"
  import Login from "@/components/Login"

  Vue.use(BootstrapVue);

    export default {
        name: "UserHeader",
      data(){
          return {
            loggedIn: true,
            firstName: undefined
          }
      },
      methods:{
        settingsButtonClicked(){
          // this.$router.push(Settings);
        },
        signoutButtonClicked() {
          let authentication_api = new FirebaseAuthenticationAPI();
          authentication_api.signOut(null).then((value => {
            this.$router.push(Login);
          }), (reason => {
            alert("couldn't sing out: " + reason);
          }));
        }
        },
      beforeCreate: function () {
        let auth_api = new FirebaseAuthenticationAPI();
        if (auth_api.isLoggedIn()){
          this.loggedIn = true;
        }else{
          this.loggedIn = false;
        }

        let authentication_api = new FirebaseAuthenticationAPI();
        authentication_api.getCurrentUser().then((user) => {
          this.firstName = user.firstName;
        }, (reason => {
          alert("error getting user info");
        }));

      },
      props:{
          pageName: String
      }

    }
</script>

<style scoped>

</style>
