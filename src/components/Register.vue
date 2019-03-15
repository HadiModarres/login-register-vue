<template>
  <div class="jumbotron container col-6 card-5">
    <h1 style="text-align: center">Register</h1>
    <br>
    <div class="container col-8">
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label class="lead">First Name</label>
        <input required minlength="2" v-model="firstName" type="text" class="form-control">
      </div>
      <div class="form-group">
        <label class="lead">Last Name</label>
        <input required minlength="2" v-model="lastName" type="text" class="form-control">
      </div>

      <div class="form-group">
        <label class="lead">Email Address Name</label>
        <input v-model="email" type="email" required class="form-control">

      </div>

      <div class="form-group">
        <label class="lead">Australian Number</label>
        <input id="phone" v-model="phone" type="text" pattern="(^1300\d{6}$)|(^1800|1900|1902\d{6}$)|(^0[2|3|7|8]{1}[0-9]{8}$)|(^13\d{4}$)|(^04\d{2,3}\d{6}$)" class="form-control">
      </div>

      <div class="form-group">
        <label class="lead">Password</label>
        <input id="password" v-model="password" type="password" required class="form-control">
      </div>

      <div class="form-group">
        <label class="lead">Confirm Password</label>
        <input required id="confirm" type="password" class="form-control">
      </div>
      <br>

      <div style="text-align: center" class="form-group">
        <button class="btn btn-primary btn-lg">
          Register
        </button>
        <br>
        <br>
        <router-link to="/login">Already have an account?</router-link>
      </div>
    </form>
    </div>
  </div>
</template>

<script>
    import {FirebaseAuthenticationAPI} from "@/services/FirebaseAuthenticationAPI";
    import {User} from "@/services/User";

    export default {
        name: "Register",
      methods:{
          handleRegister(){
            if (document.getElementById('confirm').value != document.getElementById('password').value) {
              console.log('passwords dont match');
              // todo appropriate message html
              return;
            }
            let fireStoreAPI = new FirebaseAuthenticationAPI();
            let user = new User();
            user.username = this.email;
            user.password = this.password;
            user.firstName = this.firstName;
            user.lastName = this.lastName;
            user.phone = this.phone;
            fireStoreAPI.registerUser(user).then((value => {
              alert("registered successfully: "+value);
              this.$router.push('Login');
            }),(reason => {
              alert("register failed: " + reason);
            }));
          }
      },
      data(){
          return{
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phone: ''
          }
      }
    }
</script>

<style scoped>

</style>
