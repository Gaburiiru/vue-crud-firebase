<template>
  <div>
    <h1>Agregar tarea</h1>
    <form @submit.prevent="agregarTarea(nombre)">
      <label class="visually-hidden" for="inlineFormInputGroupUsername"></label>
      <div class="input-group">
        <div class="input-group-text">Nombre</div>
        <input type="text" class="form-control" v-model="nombre" />
      </div>
      <button type="submit" class="btn btn-primary mt-2">Agregar</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "agregar",
  data() {
    return {
      nombre: "",
    };
  },
  methods: {
    ...mapActions(["agregarTarea"]),
  },
};
</script>