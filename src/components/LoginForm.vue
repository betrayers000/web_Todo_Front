<template>
  <div>
    <div v-if="loading" class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div v-else class="login-div col-6 offset-3">
      <div class="form-group">
        <label for="id">ID</label>
        <input id="id" type="text" class="form-control" v-model="credentail.username">
      </div>
      <div class="form-group">
        <label for="password">PASSWORD</label>
        <input id="password" type="password"  class="form-control" v-model="credentail.password">
      </div>
      <button class="btn btn-primary" @click="login">Login</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
  data: function(){
    return {
      credentail: {
        username: "",
        password: "",
      },
      loading: false,
    }
  },
  methods: {
    login() {
      console.log("login")
      axios.post('http://localhost:8000/api-token-auth/', this.credentail)
      .then(res=>{
        this.loading = true

        this.$session.start()
        this.$session.set('jwt', res.data.token)
        console.log(res)
      }).catch(err=>{
        this.loading = true
        console.log(err)
      })
    }
  }

}
</script>

<style>

</style>