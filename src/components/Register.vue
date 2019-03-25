<template>
  <div class="jumbotron container col-6 card-5">
    <h1 style="text-align: center">Register</h1>
    <br>
    <div class="container col-8">
    <br>
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
        <label class="lead">Email Address</label>
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
      <div v-show="error" class="alert alert-danger">{{this.error}}</div>

      <div style="text-align: center" class="form-group">
        <button class="btn btn-primary btn-lg" v-show="!registering">
          Register
        </button>
        <img v-show="registering" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
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
            this.registering = true;
            if (document.getElementById('confirm').value != document.getElementById('password').value) {
              // console.log('passwords dont match');
              this.error = "Passwords do not match."
              this.registering = false;
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
              fireStoreAPI.addUserData(user).then((value) => {
              }, (reason => {
                alert("couldn't store user info");

              }));
              this.$router.push('Login');
            }),(reason => {
              // alert("register failed: " + reason);
              this.error = reason;
            }));
            this.registering = false;
          }
      },
      data(){
          return{
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phone: '',
            error: undefined,
            registering: false
          }
      }
    }
</script>

<style scoped>

</style>
