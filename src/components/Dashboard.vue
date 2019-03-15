<template>
  <div v-if="user" class="container">
    <h1>Dashboard</h1>
    <h2> Welcome {{user.firstName}} {{user.lastName}} </h2>
    <button v-on:click="settingsButtonClicked" class="btn btn-primary">
      Settings
    </button>
  </div>
</template>

<script>
  console.log('dashboard running');
    export default {
        name: "Dashboard",
        props:{user: Object},
      data(){
          return{
            sample: 'sample'
          }
      },
      methods:{
          settingsButtonClicked(){
            this.$router.push({name: "Settings", params:{user: this.user}});
          }
      }
    }
</script>

<style scoped>

</style>
