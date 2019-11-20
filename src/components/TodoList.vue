<template>
  <div>
    <h1>Todo</h1>
    <button @click="shuffle">shuffle</button>
    <transition-group name="flip-list">
      <div class="card my-1 list-complete-item" v-for="todo in todos" :key="todo.id">
        <div class="card-body d-flex justify-content-between">
          <span @click="updateTodo(todo)" :class="{completed: todo.completed}">{{todo.title}}</span>
          <span @click="deleteTodo(todo)">🗑️</span>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import axios from 'axios'
import jwtDecode from 'jwt-decode'

export default {
  name : 'TodoList',
  props:{
    todos: Array,
  },
  methods: {
    deleteTodo(todo){
      this.$session.start()
      const token = this.$session.get('jwt')
      const requestHeader = {
        headers: {
          Authorization : "JWT " + token
        }
      }
      console.log(todo.id)
      axios.delete(`http://localhost:8000/api/v1/todos/${todo.id}/`, requestHeader)
      .then(res=>{
        console.log(res)
        const targetTodo = this.todos.find(function(el){
          return el === todo
        })
        const idx = this.todos.indexOf(targetTodo) // indexOf 값이 없으면 -1이 리턴된다.
        if (idx > -1){
          this.todos.splice(idx, 1)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    updateTodo(todo){
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
      requestForm.append('title', todo.title)
      requestForm.append('completed', !todo.completed)

      axios.put(`http://localhost:8000/api/v1/todos/${todo.id}/`, requestForm, requestHeader)
      .then(res=>{
        console.log(res)
        todo.completed = !todo.completed
      }).catch(err=>{
        console.log(err)
      })
    },
    shuffle(){
      this.todos.sort(()=>{return 0.5-Math.random()})
    }
  }
}
</script>

<style>
.completed{
  text-decoration: line-through;
  color: dimgrey
}
.flip-list-move {
  transition: transform 1s;
}
.list-complete-enter, .list-complete-leave-to{
  opacity: 0;
  transform: translateX(30px);
}
</style>