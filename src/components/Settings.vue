<template>
  <div>
    <h1>Settings</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Current Password</label>
        <input v-model="current_pass" required class="form-control" type="password" placeholder="Current Password">

      </div>
      <div class="form-group">
        <label>New Password</label>
        <input v-model="new_password" required class="form-control" type="password" minlength="8" placeholder="New Password">
      </div>
      <div class="form-group">
        <button class="btn btn-primary">
          Change Password
        </button>
        <button v-on:click="backToDashboard" to="/Dashboard">Go back to dashboard</button>
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
            if (this.current_pass !== this.user._password){
              alert('wrong password');
              // todo show appropriate html message
            }else{
              let firebase_api = new FirebaseAuthenticationAPI();
              firebase_api.changePassword(this.user, this.new_password);
            }
          },
          backToDashboard(){
            this.$router.push({name: "Dashboard", params:{user: this.user}});
          }
        },
      data() {
        return {
          current_pass: '',
          new_password: '',
        }
      },
      props:{user: Object}
    }
</script>

<style scoped>

</style>
