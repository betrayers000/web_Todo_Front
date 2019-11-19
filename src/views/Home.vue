<template>
  <div>

  </div>
</template>

<script>
import router from '../router'
export default {
  name: 'home',
  components : {

  },
  methods: {
    checkLoggedIn(){
      this.$session.start()
      if (!this.$session.has('jwt')){
        // redirect login page
        router.push('/login')
      }
    }
  },
  mounted: function(){
    this.checkLoggedIn()
  },
}
</script>

<style>

</style>