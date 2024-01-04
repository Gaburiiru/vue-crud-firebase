<template>
  <div>
    <h1>Acceso de usuario</h1>
    <form
      @submit.prevent="
        ingresoUsuario({
          email: email,
          password: pass,
        })
      "
      class="card p-2"
    >
      <input
        type="email"
        placeholder="ingrese email"
        v-model="email"
        class="form-control"
      />
      <input
        type="password"
        placeholder="ingrese la contraseña"
        v-model="pass"
        class="form-control mt-2 mb-2"
      />
      <button type="submit" :disabled="!desactivar" class="btn btn-primary">
        Ingresar
      </button>
    </form>
    <p>{{ error }}</p>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "acceso",
  data() {
    return {
      email: "",
      pass: "",
    };
  },
  methods: {
    ...mapActions(["ingresoUsuario"]),
  },
  computed: {
    ...mapState(["error"]),
    desactivar() {
      return this.pass.trim() !== "" && this.pass.length > 5;
    },
  },
};
</script>