<template>
  <div>
    <h1>Ruta protegida</h1>
    <p>{{ usuario.email }}</p>
    <router-link to="/agregar">
      <button class="btn btn-primary btn-lg font-monospace">Agregar</button>
    </router-link>

    <ul class="list-group mt-5">
      <li v-for="(item, index) in tareas" :key="index" class="list-group-item fs-4">
        {{ item.nombre }} - {{ item.id }}        <div class="float-end">
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
import { mapActions, mapState } from "vuex";

export default {
  name: "inicio",
  created() {
    this.getTareas();
  },
  methods: {
    ...mapActions(["getTareas", "eliminarTarea"]),
  },
  computed: {
    ...mapState(["tareas","usuario"]),
  },
};
</script>