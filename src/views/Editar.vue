<template>
    <div>
        <h1>Editar tarea</h1>
        <form @submit.prevent="editarTarea(tarea)">
            <input type="text" class="form-control" v-model="tarea.nombre">
            <button type="submit" class="btn btn-primary mt-2">Editar</button>
        </form>
    </div>
</template>

<script>

import { mapActions, mapState } from 'vuex';
export default {
    name:'editar',
    data(){
        return{
            id: this.$route.params.id
        }
    },
    created(){
        this.getTarea(this.id)
    },
    methods:{
        ...mapActions(['getTarea','editarTarea'])
    },
    computed:{
        ...mapState(['tarea'])
    }
}
</script>