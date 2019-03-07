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
        <router-link to="/Dashboard">Go back to dashboard</router-link>
      </div>

    </form>
  </div>
</template>

<script>
    export default {
        name: "Settings",
        methods: {
          handleSubmit(e) {
            if (this.current_pass !== this.user._password){
              alert('wrong password');
            }else{
              alert('correct password');
            }
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
