import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        menuIsVisible: false,
        user: {
            name: 'Usuário mock',
            email: 'mock@email.com'
        }
    },
    mutations: {
        toggleMenu(state, isVisible) {
            state.menuIsVisible = isVisible || !state.menuIsVisible
        }
    },
    actions: {}
})

export default store