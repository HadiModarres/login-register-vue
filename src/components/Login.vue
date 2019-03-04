<template>
    <div>
     <h1>Login</h1>
     <form @submit.prevent="handleSubmit">
       <div class="form-group">
         <label>Email Address</label>
         <input class="form-control" type="email" placeholder="Enter your email address">

       </div>
       <div class="form-group">
         <label>Password</label>
         <input class="form-control" type="password" minlength="8" placeholder="Enter your password">
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
    export default {
      name: "Login",
      methods:{
        handleSubmit(e){
          window.alert('handling submit now');
        }
      }
    }

</script>

<style scoped>

</style>
