<script setup>

import {ref, onMounted, computed, watch} from 'vue'
import Todo from './components/Todo.vue';

  const inputTodo = ref('')
  const todos = ref([])
  console.log(todos.value)
  
  watch(inputTodo, (value)=> {
    console.log(value)
  })

  onMounted(()=>{
   todos.value = JSON.parse(localStorage.getItem('vue-todos') || [])
  })

  const todos_asc = computed(() => todos.value.sort((a,b) =>{
	return b.createdAt - a.createdAt
}))

  const addTodo = () =>{
    if(inputTodo.value === null) return

    const newTodo = {
      id:Date.now(),
      todo:inputTodo.value,
      completed:false,
      createdAt:Date.now()
    }
    todos.value.push(newTodo)
    localStorage.setItem('vue-todos', JSON.stringify(todos.value))
    console.log(todos.value)
    inputTodo.value=''
  }

  const deleteTodo = (id) =>{
    console.log(id)
    todos.value = todos.value.filter(todo => todo.id !== id)
    localStorage.setItem('vue-todos', JSON.stringify(todos.value))
  }

  const toggleComplete = (id, completed) =>{
    //console.log(id, completed)
    const newTodos = todos.value.map(todo => {
      if(todo.id === id){
        return {
          ...todo,
          completed: !todo.completed
        }
      }
      return todo
    })

    todos.value = newTodos
    localStorage.setItem('vue-todos', JSON.stringify(todos.value))
  }

const updateTodo = (id, value) => {
  console.log(value)
  const newTodos = todos.value.filter(todo =>{
    if(todo.id === id){
      return {
        ...todo,
        todo:value
      }
    }
    return todo
  })
  todos.value = newTodos
  localStorage.setItem('vue-todos', JSON.stringify(todos.value))
  
}



</script>

<template>

<main>
  <h1 class="title">Todos App</h1>

  <section>
    <form @submit.prevent="addTodo">
      <div class="mainInput">
        <input
          type="text"
          placeholder="Add a task"
          v-model='inputTodo'
          maxLength="80"
          
        />
      </div>
    </form>
    <div v-if="todos">
      <div v-for="todo in todos_asc">
        <Todo :todo='todo' @deleteTodo = 'deleteTodo' @toggleComplete='toggleComplete' @updateTodo = 'updateTodo'/>
      </div>
    </div>
  </section>
</main>
  
</template>

<style>

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  main {
    width: 100vw;
    height: 100vh;
    display:flex;
    flex-direction: column;
   justify-content: center;
   align-items: center;
   gap: 2rem;
    background-color:rgba(218, 248, 251, 0.78);
  }

  .title{
    color: rgb(1, 30, 30);
    
  }

  input{
    padding: 1rem;
    border-radius: 10px;
    width: 400px;
    font-size:1.1rem;
  }

  form{
    width: 100%;
    margin-bottom: 5rem;
  }

  .mainInput{
    display:flex;
    justify-content: center;
  }
</style>
