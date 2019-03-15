<template>
  <div class="jumbotron container col-10">
    <h1>Settings</h1>
    <br>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label class="lead">New Password</label>
        <input v-model="new_password" required class="form-control" type="password" placeholder="New Password">

      </div>
      <div class="form-group">
        <label class="lead">Retype New Password</label>
        <input v-model="new_password_confirm" required class="form-control" type="password" minlength="8" placeholder="Retype New Password">
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
</template>

<script>
    import {FirebaseAuthenticationAPI} from "@/services/FirebaseAuthenticationAPI";

    export default {
        name: "Settings",
        methods: {
          handleSubmit(e) {
            if (this.new_password !== this.new_password_confirm){
              alert("passwords don't match");
              // todo show appropriate html message
            }else{
              let firebase_api = new FirebaseAuthenticationAPI();
              firebase_api.updatePassword(this.user, this.new_password).then((value => {
                alert("password changed");
              }),(reason => {
                alert("couldn't change password: " + reason);
              }));
            }
          },
          backToDashboard(){
            this.$router.push({name: "Dashboard", params:{user: this.user}});
          }
        },
      data() {
        return {
          new_password: '',
          new_password_confirm: '',
        }
      },
      props:{user: Object}
    }
</script>

<style scoped>

</style>
