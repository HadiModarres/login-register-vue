<template>
    <div>
     <h1>Login</h1>
     <form>
       <div class="form-group">
         <label>Email Address</label>
         <input class="form-control" type="text" placeholder="Enter your email address">

       </div>
       <div class="form-group">
         <label>Password</label>
         <input class="form-control" type="text" placeholder="Enter your password">
       </div>
       <div class="form-group">
        <button class="btn btn-primary">
         Login
        </button>
         <router-link to="/">Register</router-link>
       </div>

     </form>
    </div>
</template>

<script>
    export default {
        name: "Login"
    }
</script>

<style scoped>

</style>
