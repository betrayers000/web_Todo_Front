<template>
  <div>
    <div class="todo-input">
      <div class="input-group">
        <input class="form-control" type="text" v-model="title" @keydown.enter="createTodo">
        <span class="input-group-btn">
          <button class="btn btn-outline-primary" @click="createTodo">+</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoInput",
  data: function(){
    return {
      title: ''
    }
  },
  methods: {
    createTodo(){
      this.$emit('createTodo', this.title)
      this.title = ''
    }
  }
}
</script>

<style>

</style>