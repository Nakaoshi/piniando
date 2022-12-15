<template>
  <main>
    <!-- head -->

    <header>
      <img src="./assets/pinia-logo.svg" alt="Pinia Logo" />
      <h1>Pinia</h1>
    </header>

    <!-- form de tarefa nova -->
    <div class="nova-tarefa-form">
      <FormularioTarefa />
    </div>

    <!-- filtro  -->
    <nav class="filtro">
      <button @click="filtro = 'all'">Todas as tarefas</button>
      <button @click="filtro = 'favs'">tarefas favoritas</button>
    </nav>

    <!-- loading -->
    <div class="loading" v-if="loading">Carregando Tarefas.....</div>

    <!-- listas de tarefas -->

    <div class="tarefas-lista" v-if="filtro === 'all'">
      <p>você tem {{ total }}</p>
      <div v-for="tarefa in tarefas" :key="tarefa">
        <tarefasDetalhes :tarefa="tarefa" />
      </div>
    </div>

    <div class="tarefas-lista" v-if="filtro === 'favs'">
      <p>favoritas {{ contadorFav }}</p>
      <div v-for="tarefa in favs" :key="tarefa">
        <tarefasDetalhes :tarefa="tarefa" />
      </div>
    </div>

    <button @click="tarefaStore.$reset">Limpar Tarefas</button>
  </main>
</template>

<script>
import { ref } from "vue";
import tarefasDetalhes from "./components/detalhesTarefas.vue";
import { useTarefaStore } from "./store/TarefasStore";
import FormularioTarefa from "./components/formularioTarefa.vue";
import { storeToRefs } from "pinia";
export default {
  components: {
    tarefasDetalhes,
    FormularioTarefa,
  },
  setup() {
    const tarefaStore = useTarefaStore();

    const { tarefas, loading, favs, total, contadorfav } =
      storeToRefs(tarefaStore);

    // fetch tarefas
    tarefaStore.pegaTarefas();

    const filtro = ref("all");
    return { tarefaStore, filtro, tarefas, loading, favs, total, contadorfav };
  },
};
</script>
