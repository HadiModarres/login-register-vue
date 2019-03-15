<template>
  <div class="container">
    <h1>Dashboard</h1>
    <h2> Welcome {{firstName}} {{lastName}}</h2>
    <button v-on:click="settingsButtonClicked" class="btn btn-primary">
      Settings
    </button>
    <br>
    <br>
    <button v-on:click="signoutButtonClicked" class="btn btn-primary">
      Sign out
    </button>

  </div>
</template>

<script>
  import {FirebaseAuthenticationAPI} from "@/services/FirebaseAuthenticationAPI";
  import Login from "@/components/Login";

  console.log('dashboard running');
    export default {
        name: "Dashboard",
        props:{user: Object},
      data(){
          return{
            firstName: '',
            lastName: '',
            phoneNumber: '',
          }
      },
      methods:{
          settingsButtonClicked(){
            this.$router.push({name: "Settings", params:{user: this.user}});
          },
          signoutButtonClicked(){
            let authentication_api = new FirebaseAuthenticationAPI();
            authentication_api.signOut(null).then((value => {
              alert('signed out');
              this.$router.push(Login);
            }),(reason => {
              alert("couldn't sing out: " + reason);
            }));

          }
      },
      created: function () {
        let authentication_api = new FirebaseAuthenticationAPI();
        authentication_api.getCurrentUser().then((user) => {
          this.firstName = user.firstName;
          this.lastName = user.lastName;
          this.phoneNumber = user.phone;
        }, (reason => {
          alert("error getting user info");
        }));

      }


    }
</script>

<style scoped>

</style>
