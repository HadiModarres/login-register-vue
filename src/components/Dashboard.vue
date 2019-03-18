<template>
  <div>
    <UserHeader pageName="Dashboard"></UserHeader>
    <br>
    <br>
    <br>
    <br>


    <h2 style="text-align: center"> Welcome {{firstName}} {{lastName}}</h2>

  </div>
</template>

<script>
  import {FirebaseAuthenticationAPI} from "@/services/FirebaseAuthenticationAPI";
  import Login from "@/components/Login";
  import UserHeader from "@/components/Header";
  import Settings from "@/components/Settings"

  console.log('dashboard running');
    export default {
        name: "Dashboard",
      components: {UserHeader},
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
            this.$router.push(Settings);
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
