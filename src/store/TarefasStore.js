import { defineStore } from "pinia";
export const useTarefaStore = defineStore("tarefasStore", {
  state: () => ({
    tarefas: [],
    loading:false,
  }),
   /*--------------------------------
  getters
  --------------------------------*/
  getters: {
    // pegando só os favoritos = true 
    favs() {
      return this.tarefas.filter((t) => t.fav);
    },
    
    // pegando a quantidade de favoritos
    contadorfav() {
      return this.tarefas.reduce((p, c) => {
        return c.fav ? p + 1 : p;
      }, 0);
    },
    // pegando o total de tarefas em geral 
    total: (state) => {
      return state.tarefas.length;
    },
  },

  /*--------------------------------
  actions
  --------------------------------*/
  actions: {
    // get de um json local no json-server 
    async pegaTarefas(){
      this.loading = true;


      const res = await fetch('http://localhost:3000/tarefas')
      const data = await res.json();
      this.tarefas = data;


      this.loading = false;
    },

    // post de um json local  no json-server
   async addTarefa(tarefa) {
      this.tarefas.push(tarefa);

      const res = await fetch('http://localhost:3000/tarefas', {
        method:'POST',
        body: JSON.stringify(tarefa),
        headers:{'Content-Type' : 'application/json'}
      });

      if(res.error){
        console.log(res.error)
      }

    },

    // delete de um json local no json-server
    async deletarTarefa(id) {
      this.tarefas = this.tarefas.filter((t) => {
        return t.id !== id;
      });

      const response = await fetch(`http://localhost:3000/tarefas/${id}`,{
        method:'DELETE',
      });

      if(response.error){
        console.log(response.error)
      }
      
    },
    // patch de um json local no json-server
    async favoritar(id) {
      const tarefa = this.tarefas.find((t) => t.id === id);
      tarefa.fav = !tarefa.fav;

      const response = await fetch('http://localhost:3000/tarefas/' + id, {
        method:'PATCH',
        body: JSON.stringify({fav: tarefa.fav}) ,
        headers:{'Content-Type': 'application/json'}
      });

      if(response.error){
        console.log(response.error)
      }
    },
  },
});
