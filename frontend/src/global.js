import Vue from 'vue'

export const baseUrlApi = 'http://localhost:3000'

export const showError = function(e) {
    if(e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg: e.response.data })
    } else if(typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg: e })
    } else {
        Vue.toasted.global.defaultError()
    }
}
