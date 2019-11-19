<template>
  <div>
    <h1>Todo</h1>
    <div class="card my-1" v-for="todo in todos" :key="todo.id">
      <div class="card-body d-flex justify-content-between">
        <span>{{todo.title}}</span>
        <span @click="deleteTodo(todo)">🗑️</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

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
    }
  }
}
</script>

<style>

</style>