<template>
  <div>
    <h1>Acceso de usuario</h1>
    <form
      @submit.prevent="
        ingresoUsuario({
          email: $v.email.$model,
          password: $v.pass.$model,
        })
      "
      class="card p-2"
    >
      <input
        type="email"
        placeholder="ingrese email"
        v-model="$v.email.$model"
        class="form-control mb-1"
      />
      <small class="text-danger" v-if="!$v.email.required"
        >Campo requerido</small
      >
      <small class="text-danger" v-if="!$v.email.email">Email no valido</small>
      <input
        type="password"
        placeholder="ingrese la contraseña"
        v-model="$v.pass.$model"
        class="form-control mt-2 mb-2"
      />
      <small class="text-danger" v-if="!$v.pass.required"
        >Campo requerido</small
      >
      <small class="text-danger" v-if="!$v.pass.minLength"
        >minimo 6 caracteres</small
      >
      <button
        type="submit"
        :disabled="$v.$invalid"
        class="btn btn-primary mt-2"
      >
        Ingresar
      </button>
    </form>
    <p v-if="error === 'auth/internal-error'" class="text-danger">
      Email o contraseña incorrectos
    </p>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required, minLength, email } from "vuelidate/lib/validators";

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
  },
  validations: {
    email: {
      required,
      email,
    },
    pass: {
      required,
      minLength: minLength(6),
    },
  },
};
</script>