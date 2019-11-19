<template>
  <div>
    <TodoList/>
  </div>
</template>

<script>
import router from '../router'
import TodoList from '../components/TodoList.vue'
export default {
  name: 'home',
  components : {
    TodoList,
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