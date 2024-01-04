<template>
  <div id="app" class="container mt-4">
    <div class="text-center">
      <router-link to="/" v-if="existeUsuario" class="btn btn-outline-success m-2">
        inicio
      </router-link>
      <router-link
        to="/registro"
        v-if="!existeUsuario"
        class="btn btn-outline-dark m-2"
      >
        Registro
      </router-link>
      <router-link
        to="/acceso"
        v-if="!existeUsuario"
        class="btn btn-outline-dark m-2"
      >
        Acceso
      </router-link>
      <button @click="cerrarSesion" v-if="existeUsuario" class="btn btn-outline-danger m-2">cerrar sesion</button>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions(["cerrarSesion"]),
  },
  computed: {
    ...mapGetters(["existeUsuario"]),
  },
};
</script>