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
export default {
  data: function(){
    return {
      credentail: {},
      loading: false,
    }
  },
  methods: {
    login() {
      console.log("login")
    }
  }

}
</script>

<style>

</style>