<template>
  <div>
    <UserHeader pageName="Settings"></UserHeader>
    <br>
    <br>
    <div class="jumbotron container col-10 card-5">
      <br>
      <form @submit.prevent="handleSubmit">
        <div v-show="message" v-bind:class="{'alert-danger': error, 'alert-success': !error}" class="alert">{{this.message}}</div>
        <div class="form-group">
          <label class="lead">New Password</label>
          <input v-model="new_password" required class="form-control" type="password" placeholder="New Password">

        </div>
        <div class="form-group">
          <label class="lead">Retype New Password</label>
          <input v-model="new_password_confirm" required class="form-control" type="password" minlength="8"
                 placeholder="Retype New Password">
        </div>
        <br>
        <div class="form-group">
          <button class="btn btn-primary">
            Change Password
          </button>
          <button class="btn btn-default" v-on:click="backToDashboard" to="/Dashboard">Go back to dashboard</button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
  import {FirebaseAuthenticationAPI} from "@/services/FirebaseAuthenticationAPI";
  import UserHeader from "@/components/Header";

  export default {
    name: "Settings",
    methods: {
      handleSubmit(e) {
        if (this.new_password !== this.new_password_confirm) {
          this.message = "Passwords do not match.";
          this.error = true;

        } else {
          let firebase_api = new FirebaseAuthenticationAPI();
          firebase_api.updatePassword(this.user, this.new_password).then((value => {
            this.message = "Password changed.";
            this.error = false;
          }), (reason => {
            this.error = true;
            this.message = reason;
          }));
        }
      },
      backToDashboard() {
        this.$router.push({name: "Dashboard", params: {user: this.user}});
      }
    },
    data() {
      return {
        new_password: '',
        new_password_confirm: '',
        message: undefined,
        error : false
      }
    },
    components: {UserHeader}
  }
</script>

<style scoped>

</style>
