import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        menuIsVisible: false,
        user: null
    },
    mutations: {
        toggleMenu(state, isVisible) {
            if(!state.user) {
                state.menuIsVisible = false
                return
            }

            state.menuIsVisible = isVisible || !state.menuIsVisible
        },

        setUSer(state, user) {
            if(user) {
                state.user = user
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
                state.menuIsVisible = true
            } else {
                delete axios.defaults.headers.common['Authorization']
                state.menuIsVisible = false
            }
        }
    },
    actions: {}
})

export default store