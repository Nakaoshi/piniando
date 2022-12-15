<template>
    <form @submit.prevent="submitTarefa">
        <input 
        type="text"
        placeholder="eu preciso....."
        v-model="novaTarefa"
        >
        <button type="submit">Adicionar</button>
    </form>
  
</template>

<script>
import { ref } from 'vue';
import { useTarefaStore } from '../store/TarefasStore';
export default {
   setup(){
    const tarefasStore = useTarefaStore()

    const novaTarefa = ref('')

    const submitTarefa = () => {
        if(novaTarefa.value.length > 0 ){
            tarefasStore.addTarefa({
                titulo: novaTarefa.value,
                fav: false,
                id: Math.floor(Math.random() * 1000),
            })
            novaTarefa.value = ''
        }
    }
    return { submitTarefa, novaTarefa}
   }
}
</script>

<style>

</style>