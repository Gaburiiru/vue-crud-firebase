<template>
  <div>
    <h1>Editar tarea</h1>
    <form @submit.prevent="editarTarea(tarea)">
      <input
        type="text"
        class="form-control"
        v-model="$v.tarea.nombre.$model"
      />
      <small class="text-danger" v-if="!$v.tarea.nombre.required"
        >Campo requerido</small
      >
      <button type="submit" class="btn btn-primary mt-2 form-control" :disabled="$v.tarea.$invalid">
        Editar
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
  name: "editar",
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  created() {
    this.getTarea(this.id);
  },
  methods: {
    ...mapActions(["getTarea", "editarTarea"]),
  },
  computed: {
    ...mapState(["tarea"]),
  },
  validations: {
    tarea: {
      nombre: {
        required,
      },
    },
  },
};
</script>