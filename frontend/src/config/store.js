import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        menuIsVisible: true
    },
    mutations: {
        toggleMenu(state, isVisible) {
            state.menuIsVisible = isVisible || !state.menuIsVisible
        }
    },
    actions: {}
})

export default store