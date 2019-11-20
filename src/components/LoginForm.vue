<template>
  <div>
    <div v-if="loading" class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div v-else class="login-div col-6 offset-3">
      <div v-if="errors.length" class="error-list alert alert-danger">
        <div v-for="(error, idx) in errors" :key="idx">{{error}}</div>
      </div>
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
      errors: [],
    }
  },
  methods: {
    login() {
      if (this.checkForm()){
        console.log("login")
        axios.post('http://localhost:8000/api-token-auth/', this.credentail)
        .then(res=>{
          this.loading = true
  
          // this.$session.start()
          // this.$session.set('jwt', res.data.token)
          this.$store.dispatch('login', res.data.token)
  
          router.push('/')
          console.log(res)
        }).catch(err=>{
          this.loading = true
          console.log(err)
        })
      }
    },
    checkForm(){
      this.errors = []
      if (this.credentail.password.length < 8) {
        this.errors.push('비밀번호는 8글자가 넘어야 합니다.')
      }
      if (!this.credentail.username){
        this.errors.push('아이디를 입력해주세요')
      }
      console.log(this.errors)
      if (this.errors.length === 0){
        return true
      }
    }
  }

}
</script>

<style>

</style>