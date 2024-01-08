import Vue from "vue";
import Vuex from "vuex";
import { db, auth } from "../firebase";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tareas: [],
    tarea: { nombre: "", id: "" },
    usuario: null,
    error: null,
    carga: false,
    texto: "",
  },
  mutations: {
    setTareas(state, payload) {
      state.tareas = payload;
    },
    setTarea(state, payload) {
      state.tarea = payload;
    },
    setEliminarTarea(state, payload) {
      state.tareas = state.tareas.filter((item) => item.id !== payload);
    },
    setUsuario(state, payload) {
      state.usuario = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    cargarFirebase(state, payload) {
      state.carga = payload;
    },
  },
  actions: {
    buscador({ commit, state }, payload) {
      // console.log(payload);
      state.texto = payload.toLowerCase();
    },
    getTareas({ commit, state }) {
      commit("cargarFirebase", true);

      const tareas = [];
      db.collection(state.usuario.email)
        .get()
        .then((res) => {
          res.forEach((doc) => {
            // console.log(doc.id);
            // console.log(doc.data());
            let tarea = doc.data();
            tarea.id = doc.id;
            tareas.push(tarea);
          });
          setTimeout(() => {
            commit("cargarFirebase", false);
          }, 1000);
        });

      commit("setTareas", tareas);
    },
    getTarea({ commit, state }, idTarea) {
      db.collection(state.usuario.email)
        .doc(idTarea)
        .get()
        .then((doc) => {
          // console.log(doc.id);
          // console.log(doc.data());
          let tarea = doc.data();
          tarea.id = doc.id;
          commit("setTarea", tarea);
        });
    },
    editarTarea({ commit, state }, tarea) {
      db.collection(state.usuario.email)
        .doc(tarea.id)
        .update({ nombre: tarea.nombre })
        .then(() => {
          // console.log("tarea editada");
          router.push("/");
        });
    },
    agregarTarea({ commit, state }, nombreTarea) {
      commit("cargarFirebase", true);
      db.collection(state.usuario.email)
        .add({
          nombre: nombreTarea,
        })
        .then((doc) => {
          // console.log(doc.id);
          router.push("/");
          commit("cargarFirebase", false);
        });
    },
    eliminarTarea({ commit, dispatch, state }, idTarea) {
      db.collection(state.usuario.email)
        .doc(idTarea)
        .delete()
        .then(() => {
          //console.log("tarea eliminada");
          /*
          se puede utilizar dispatch pero el mismo hace una peticion al servidor
          dispatch("getTareas");*/
          commit("setEliminarTarea", idTarea);
        });
    },
    crearUsuario({ commit }, usuario) {
      auth
        .createUserWithEmailAndPassword(usuario.email, usuario.password)
        .then((res) => {
          // console.log(res);
          const usuarioCreado = {
            email: res.user.email,
            uid: res.user.uid,
          };

          db.collection(res.user.email).then(router.push("/"), (doc) => {
            commit("setUsuario", usuarioCreado);
          });
        })
        .catch((error) => {
          console.log(error);
          commit("setError", error.code);
        });
    },
    ingresoUsuario({ commit }, usuario) {
      auth
        .signInWithEmailAndPassword(usuario.email, usuario.password)
        .then((res) => {
          //console.log(res);
          const usuarioLogeado = {
            email: res.user.email,
            uid: res.user.uid,
          };
          commit("setUsuario", usuarioLogeado);
          router.push("/");
        })
        .catch((error) => {
          // console.log(error);
          commit("setError", error.code);
        });
    },
    cerrarSesion({ commit }) {
      auth.signOut().then(() => {
        router.push("/acceso");
      });
    },
    detectarUsuario({ commit }, usuario) {
      commit("setUsuario", usuario);
    },
  },
  getters: {
    existeUsuario(state) {
      if (state.usuario === null) {
        return false;
      } else {
        return true;
      }
    },
    arrayFiltrado(state) {
      let arrayFiltrado = [];
      for (let tarea of state.tareas) {
        let nombre = tarea.nombre.toLowerCase();
        if (nombre.indexOf(state.texto) >= 0) {
          arrayFiltrado.push(tarea);
        }
      }
      return arrayFiltrado;
    },
  },
  modules: {},
});
