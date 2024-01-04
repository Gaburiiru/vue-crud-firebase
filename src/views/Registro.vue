<template>
  <div>
    <h1>Registro de usuarios</h1>
    <form @submit.prevent="crearUsuario({ email: email, password: pass1 })" class="card p-2">
      <input type="email" placeholder="Ingrese su correo" v-model="email" class="form-control mb-2"/>
      <input
        type="password"
        placeholder="Ingrese su contraseña"
        v-model="pass1" class="form-control mb-2"
      />
      <input
        type="password"
        placeholder="Repita su contraseña"
        v-model="pass2" class="form-control mb-2"
      />
      <button type="submit" :disabled="!desactivar" class="btn btn-primary">Registrar usuario</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "registro",
  data() {
    return {
      email: "",
      pass1: "",
      pass2: "",
    };
  },
  created() {},
  methods: {
    ...mapActions(["crearUsuario"]),
  },
  computed: {
    ...mapState(["error"]),
    desactivar() {
      // validacion de contraseña, primero se fija que las dos pass sean iguales, luego limpia los espacio vacios de la pass1 y por ultimo pregunta por el largo de la contraseña porque por defecto firebase pide que sea de 6 caracteres
      return (
        this.pass1 === this.pass2 &&
        this.pass1.trim() !== "" &&
        this.pass1.length > 5
      );
    },
  },
};
</script>