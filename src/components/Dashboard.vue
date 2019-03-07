<template>
  <div>
  <h1>Dashboard</h1>
  <h2> {{user._username}} </h2>
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
      }
    }

</script>

<style scoped>

</style>
