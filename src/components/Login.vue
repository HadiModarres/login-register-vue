<template>
    <div>
     <h1>Login</h1>
     <form @submit.prevent="handleSubmit">
       <div class="form-group">
         <label>Email Address</label>
         <input v-model="username" required class="form-control" type="email" placeholder="Enter your email address">

       </div>
       <div class="form-group">
         <label>Password</label>
         <input v-model="password" required class="form-control" type="password" minlength="8" placeholder="Enter your password">
       </div>
       <div class="form-group">
        <button class="btn btn-primary">
         Login
        </button>
         <router-link to="/register">Register</router-link>
       </div>

     </form>
    </div>
</template>

<script>
  import {FirebaseAuthenticationAPI} from '../services/FirebaseAuthenticationAPI';
  import {User} from "@/services/User";

  export default {
    name: "Login",
    methods: {
      handleSubmit(e) {
        const {username, password} = this;
        let authenticator = new FirebaseAuthenticationAPI();
        let user = new User();
        user._username = username;
        user._password = password;
        authenticator.sendLoginRequest(user).then((value => {
          console.log('successful login, token received: ' + value);
          user._token=value;
          // todo redirect to dashboard
        }), (reason => {
          // todo inform user of the problem
        }));

      }
    },
    data() {
      return {
        username: '',
        password: '',
        submitted: false
      }
    }
  };

</script>

<style scoped>

</style>
