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
        user.username = username;
        user.password = password;
        authenticator.loginUser(user).then((value => {
          console.log('successful login, token received: ' + value);
          user._token=value;
          alert("logged in: " + user._token);
          this.$router.push({name:'Dashboard' , params: {user: user}});
        }), (reason => {
          // todo inform user of the problem
          alert('login failed');
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
