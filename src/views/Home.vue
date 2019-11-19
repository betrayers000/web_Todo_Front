<template>
  <div>
    <TodoInput @createTodo="createTodo"/>
    <TodoList :todos="todos"/>
  </div>
</template>

<script>
import router from '../router'
import TodoList from '../components/TodoList.vue'
import TodoInput from '@/components/TodoInput.vue' //@ => src에 대응함
import jwtDecode from 'jwt-decode'
import axios from 'axios'

export default {
  name: 'home',
  components : {
    TodoList,
    TodoInput,
  },
  data: function(){
    return {
      todos: [],
    }
  },
  methods: {
    checkLoggedIn(){
      this.$session.start()
      if (!this.$session.has('jwt')){
        // redirect login page
        router.push('/login')
      }
    },
    getTodos(){
      this.$session.start()
      const token = this.$session.get('jwt')
      const decodedToken = jwtDecode(token)
      const userId = decodedToken.user_id

      const requestHeader = {
        headers: {
          Authorization : "JWT " + token
        }
      }

      console.log(`get ${decodedToken.username}'s todo_list`)
      axios.get(`http://localhost:8000/api/v1/users/${userId}/`, requestHeader).then(res=>{
        this.todos = res.data.todo_set
      }).catch(err=>{
        console.log(err)
      })
    },
    createTodo(title){
      this.$session.start()
      const token = this.$session.get('jwt')
      const decodedToken = jwtDecode(token)
      const userId = decodedToken.user_id
      const requestHeader = {
        headers: {
          Authorization : "JWT " + token
        }
      }
      const requestForm = new FormData()
      requestForm.append('user', userId)
      requestForm.append('title', title)
      axios.post(`http://localhost:8000/api/v1/todos/`, requestForm, requestHeader)
      .then(res=>{
        console.log(res)
        this.todos.push(res.data)
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  mounted: function(){
    this.checkLoggedIn()
    this.getTodos()
  },
}
</script>

<style>

</style>