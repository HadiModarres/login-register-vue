<template>

    <div class="jumbotron container col-6 card-5">
      <div class="container col-8">
        <div v-show="error" class="alert alert-danger">{{this.error}}</div>
        <br>
        <h1 style="text-align: center">Login</h1>
     <form @submit.prevent="handleSubmit">
       <div class="form-group">
         <label class="lead">Email Address</label>
         <input v-model="username" required class="form-control" type="email" placeholder="Enter your email address">
       </div>
       <div class="form-group">
         <label class="lead">Password</label>
         <input v-model="password" required class="form-control" type="password" minlength="8" placeholder="Enter your password">
       </div>
       <br>
       <div style="text-align: center" class="form-group">
        <button class="btn btn-primary btn-lg" v-show="!loggingIn">
         Login
        </button>
        <img v-show="loggingIn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
        <br/>
         <br>
         <router-link to="/register">Create an account</router-link>
       </div>
     </form>
        </div>
        </div>
</template>

<script>
  import {FirebaseAuthenticationAPI} from '../services/FirebaseAuthenticationAPI';
  import {User} from "@/services/User";

  export default {
    name: "Login",
    methods: {
      handleSubmit(e) {
        this.loggingIn = true;
        // this.error = undefined;
        const {username, password} = this;
        let authenticator = new FirebaseAuthenticationAPI();
        let user = new User();
        user.username = username;
        user.password = password;
        authenticator.loginUser(user).then((value => {
          console.log('successful login, token received: ' + value);
          user._token=value;
          this.$router.push({name:'Dashboard' , params: {user: user}});
        }), (reason => {
          this.loggingIn=false;
          this.error = reason;
        }));
      }
    },
    data() {
      return {
        username: '',
        password: '',
        submitted: false,
        error: undefined,
        loggingIn: false
      }
    }
  };

</script>

<style scoped>

</style>
