<template>
  <div>
    <h1>Ruta protegida</h1>
    <p>{{ usuario.email }}</p>
    <router-link to="/agregar">
      <button class="btn btn-success btn-lg font-monospace form-control">
        Agregar
      </button>
    </router-link>
    <!-- buscador -->
    <form @submit.prevent="buscador(texto)">
      <input
        type="text"
        placeholder="Buscar tareas..."
        class="form-control mt-5"
        v-model="texto"
        v-on:keyup="buscador(texto)"
      />
    </form>
    <!-- spinner -->
    <div v-if="carga" class="text-center mt-5">
      <h3>cargando contenido...</h3>
      <b-spinner />
    </div>
    <!-- contendo principal -->
    <ul class="list-group mt-2" v-if="!carga">
      <li class="list-group-item active text-center">Listas de tareas</li>
      <li class="list-group-item fs-4 text-center" v-if="arrayFiltrado.length === 0">
        No hay tareas
      </li>
      <li
        v-for="(item, index) in arrayFiltrado"
        :key="index"
        class="list-group-item fs-4"
      >        
        {{ item.nombre }} - {{ item.id }}
        <div class="float-end">
          <router-link
            :to="{ name: 'editar', params: { id: item.id } }"
            class="btn btn-warning btn-sm m-2"
          >
            Editar
          </router-link>
          <button @click="eliminarTarea(item.id)" class="btn btn-danger btn-sm">
            Eliminar
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "inicio",
  data() {
    return {
      texto: "",
    };
  },
  created() {
    this.getTareas();
  },
  methods: {
    ...mapActions(["getTareas", "eliminarTarea", "buscador"]),
  },
  computed: {
    ...mapState(["tareas", "usuario", "carga"]),
    ...mapGetters(["arrayFiltrado"]),
  },
};
</script>