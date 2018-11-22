import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    auth:false,
    server:false,
    curTab:0,
    role:99,
    username:''
  },
  actions: {
    loginF: function( {commit} ) {
      commit('login', {auth:true} )
    },
    logoutF: function( {commit} ) {
      commit('logout', {auth:false} )
    },
    sON: function( {commit} ) {
      commit('serverON', {server:true} )
    },
    sOFF: function( {commit} ) {
      commit('serverOFF', {server:false} )
    },
    newTab: function( {commit}, action ) {
      commit('setTab', action)
    }
  },
  mutations: {
    login: (state, {auth}) => {
      state.auth = auth
    },
    logout: (state, {auth}) => {
      state.auth = auth
    },
    serverON: (state, {server}) => {
      state.server = server
    },
    serverOFF: (state, {server}) => {
      state.server = server
    },
    setTab: (state, action) => {
      state.curTab = action
    }
  },
  getters: {
    auth: state => {
      return state.auth
    },
    server: state => {
      return state.server
    },
    curTab: state => {
      return state.curTab
    }
  }
});

export default store
