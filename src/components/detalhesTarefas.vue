<template>
  <div class="tarefa">
    <h3>{{tarefa.titulo}}</h3>
    <div class="icons">
        <i 
        class="material-icons" 
        @click="tarefaStore.deletarTarefa(tarefa.id)">delete</i>
        <i 
        :class="tarefa.fav == true ? 'fav' :'noFav' "
        class="material-icons" 
        @click="tarefaStore.favoritar(tarefa.id)">favorite</i>
    </div>
  </div>
</template>

<script>
import { useTarefaStore } from '../store/TarefasStore'
export default {
    props:['tarefa'],
    setup() {
      const tarefaStore = useTarefaStore();

      return { tarefaStore}
    }
}
</script>

<style>
  
</style>