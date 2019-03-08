<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="handleRegister(e)">
      <div class="form-group">
        <label>First Name</label>
        <input v-model="firstName" type="text" class="form-control">
      </div>
      <div class="form-group">
        <label>Last Name</label>
        <input v-model="lastName" type="text" class="form-control">
      </div>

      <div class="form-group">
        <label>Email Address Name</label>
        <input v-model="email" type="email" required class="form-control">

      </div>

      <div class="form-group">
        <label>Australian Number</label>
        <input v-model="phone" type="text" pattern="(^1300\d{6}$)|(^1800|1900|1902\d{6}$)|(^0[2|3|7|8]{1}[0-9]{8}$)|(^13\d{4}$)|(^04\d{2,3}\d{6}$)" class="form-control">
      </div>

      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" required class="form-control">

      </div>

      <div class="form-group">
        <label>Confirm Password</label>
        <input type="password" class="form-control">

      </div>

      <div class="form-group">
        <button class="btn btn-primary">
          Register
        </button>
        <router-link to="/login">Already have an account?</router-link>
      </div>

    </form>
  </div>
</template>

<script>
    import {FirebaseAuthenticationAPI} from "@/services/FirebaseAuthenticationAPI";
    import {User} from "@/services/User";

    export default {
        name: "Register",
      methods:{
          handleRegister(e){
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
