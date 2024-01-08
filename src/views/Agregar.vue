<template>
  <div>
    <h1>Agregar tarea</h1>
    <form @submit.prevent="agregarTarea($v.nombre.$model)">
      <label class="visually-hidden" for="inlineFormInputGroupUsername"></label>
      <div class="input-group">
        <div class="input-group-text">Nombre</div>
        <input type="text" class="form-control" v-model="$v.nombre.$model" />
      </div>
      <small class="text-center text-danger" v-if="!$v.nombre.required"
        >Campo requerido</small
      >
      <small class="text-center text-danger" v-if="!$v.nombre.minLength"
        >minimo 5 caracteres</small
      >
      <button
        type="submit"
        class="btn btn-primary mt-2 form-control"
        :disabled="$v.$invalid || carga"
      >
        Agregar
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required, minLength } from "vuelidate/lib/validators";

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
  validations: {
    nombre: {
      required,
      minLength: minLength(5),
    },
  },
  computed: {
    ...mapState(["carga"]),
  },
};
</script>