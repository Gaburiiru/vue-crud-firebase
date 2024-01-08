<template>
  <div>
    <h1>Registro de usuarios</h1>
    <form
      @submit.prevent="
        crearUsuario({ email: $v.email.$model, password: $v.pass1.$model })
      "
      class="card p-2"
    >
      <input
        type="email"
        placeholder="Ingrese su correo"
        v-model="$v.email.$model"
        class="form-control mb-2"
      />
      <small class="text-danger mb-2" v-if="!$v.email.required"
        >Campo requerido</small
      >
      <small class="text-danger mb-2" v-if="!$v.email.email"
        >Email no valido</small
      >
      <input
        type="password"
        placeholder="Ingrese su contraseña"
        v-model="$v.pass1.$model"
        class="form-control mb-2"
      />
      <small class="text-danger mb-2" v-if="!$v.pass1.required"
        >Campo requerido</small
      >
      <small class="text-danger mb-2" v-if="!$v.pass1.minLength"
        >minimo 6 caracteres</small
      >
      <input
        type="password"
        placeholder="Repita su contraseña"
        v-model="$v.pass2.$model"
        class="form-control mb-2"
      />
      <small class="text-danger mb-2" v-if="!$v.pass2.required"
        >Campo requerido</small
      >
      <small class="text-danger mb-2" v-if="!$v.pass2.sameAs"
        >las contraseñas deben coincidir</small
      >
      <button type="submit" :disabled="$v.$invalid" class="btn btn-primary">
        Registrar usuario
      </button>
    </form>
    <p v-if="error === 'auth/email-already-in-use'" class="text-danger">
      Email ya en uso
    </p>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";

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
    /* desactivar() {
      // ESTO SE USABA ANTES DE IMPLEMENTAR Vuelidate
      // validacion de contraseña, primero se fija que las dos pass sean iguales, luego limpia los espacio vacios de la pass1 y por ultimo pregunta por el largo de la contraseña porque por defecto firebase pide que sea de 6 caracteres
      return (
        this.pass1 === this.pass2 &&
        this.pass1.trim() !== "" &&
        this.pass1.length > 5
      );
     }, */
  },
  validations: {
    email: {
      required,
      email,
    },
    pass1: {
      minLength: minLength(6),
      required,
    },
    pass2: {
      sameAs: sameAs("pass1"),
      required,
    },
  },
};
</script>