<template>
  <div id="app">
    <div id="nav">
      <div v-if="isAuthenticated">
        <router-link to="/">Home</router-link> |
        <a href="" @click.prevent="logout">Logout</a>
      </div>
      <div v-else>
        <router-link to="/Login">Login</router-link>
      </div>
    </div>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function(){
    return {
      isAuthenticated: this.$session.has('jwt')
    }
  },
  methods: {
    logout(){
      console.log('click logout')
      this.$session.destroy()
      this.$router.push('/login')
    }
  },
  updated(){
    this.isAuthenticated = this.$session.has('jwt')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
