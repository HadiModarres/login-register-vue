<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="handleRegister(e)">
      <div class="form-group">
        <label>First Name</label>
        <input type="text" required class="form-control">
      </div>
      <div class="form-group">
        <label>Last Name</label>
        <input type="text" required class="form-control">
      </div>

      <div class="form-group">
        <label>Email Address Name</label>
        <input type="email" required class="form-control">

      </div>

      <div class="form-group">
        <label>Australian Number</label>
        <input type="text" required pattern="(^1300\d{6}$)|(^1800|1900|1902\d{6}$)|(^0[2|3|7|8]{1}[0-9]{8}$)|(^13\d{4}$)|(^04\d{2,3}\d{6}$)" class="form-control">
      </div>

      <div class="form-group">
        <label>Password</label>
        <input type="password" required class="form-control">

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
    export default {
        name: "Register",
      methods:{
          handleRegister(e){
            window.alert('handling register');
            //todo check password requirements
          }
      }
    }
</script>

<style scoped>

</style>
