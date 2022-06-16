<script setup>
import {ref} from 'vue'

const inputRef = ref(true)
//console.log(inputRef.onkeypress)

 const props = defineProps({
     todo:{
         type: Object,
        
     }
 })

 

 const handleDelete = (id) => {
     //console.log(id)
     emits('deleteTodo', id)
 }


 const toggleCheck = (id, completed) =>{
     //console.log(id, completed)
     emits('toggleComplete', id, completed)
 }

const emits = defineEmits(['deleteTodo', 'toggleComplete', 'updateTodo'])

const changeFocus = (e) =>{
    inputRef.value.disabled = false
    inputRef.value.focus()
}

const edit = (e, id, todo) =>{
    //console.log(e.which)
    
        emits('updateTodo', id, todo)
        inputRef.value.disabled = true
    
}

 


</script>


<template>
    <div class="todo__wrap" :key="todo.id">
        <div @click="toggleCheck(props.todo.id, props.todo.completed)">
            <div v-if="!props.todo.completed">
                <font-awesome-icon icon="circle" size="lg" fixed-width color="white" class='icon'/>
            </div>
            <div v-else>
                <font-awesome-icon icon="circle-check" size="lg" fixed-width color="rgb(84, 238, 84)" class='icon' />
            </div>
        </div>

        <input 
            :class="todo.completed? 'todo__complete': 'todo'" 
            v-model="props.todo.todo" 
            ref="inputRef"
            :disabled="inputRef"
            @keypress.enter="edit(todo.id, todo.todo. e)"
        />
        <div class="btns">
            <button @click="handleDelete(todo.id)" class="delete">Delete</button>
            <button @click="changeFocus" class="edit">Edit</button>
        </div>
    </div>
</template>


<style>

    input{
         border-radius: 10px;
         text-overflow: ellipsis;
    }

    .todo{
        background-color:rgb(0, 86, 97);
        border: none;
        color: white;
        font-size:1.2rem;
        border-radius: 10px;
       
    }

    .todo__complete {
        background-color:rgb(0, 86, 97);
        border: none;
        color: white;
        font-size:1.2rem;
        border-radius: 10px;
        text-decoration-color: rgb(84, 238, 84);
        text-decoration-line: line-through;
        text-decoration-thickness: 3px;

        
        
    }

    .todo__complete:focus{
        
        outline: none;
    }

    .todo:focus{
        border: none;
        outline: none;
    }

    .todo__wrap{
        background-color:rgb(0, 86, 97) ;
         border-radius: 10px;
         margin-top: 2rem;
         padding: 0 1rem;
         display:flex;
         align-items: center;
    }

    .delete{
        background-color: rgb(237, 237, 200);
       border: none;
        padding:.4rem;
        border-radius: 5px;
        cursor: pointer; 
    }

    .edit{
        background-color:rgb(246, 199, 161);
        padding:.4rem;
        border: none;
        cursor: pointer;
         border-radius: 5px;


}

    .btns{
        display: flex;
        align-items: center;
        gap: .5rem;
    }

    .icon{
        cursor: pointer;
    }


</style>