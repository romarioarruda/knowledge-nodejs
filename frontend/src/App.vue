<template>
	<div id="app" :class="{'hide-menu': !menuIsVisible || !user}">
		<Header title="Base de conhecimentos" :hideToggle="!user" :hideUserDropDown="!user"/>
		<Menu v-if="user"/>
		<Loading v-if="validToken"/>
		<Content v-else/>
		<Footer/>
	</div>
</template>

<script>
import { baseUrlApi, userKey } from '@/global'
import { mapState } from 'vuex'
import axios from 'axios'
import Header from '@/components/template/Header'
import Menu from '@/components/template/Menu'
import Content from '@/components/template/Content'
import Footer from '@/components/template/Footer'
import Loading from '@/components/template/Loading'

export default {
	name: "App",
	components: {
		Header,
		Menu,
		Content,
		Footer,
		Loading
	},
	data() {
		return {
			validToken: true
		}
	},

	created() {
		this.validateToken()
	},

	methods: {
		async validateToken() {
			this.validToken = true
			
			const json = localStorage.getItem(userKey)
			const userData = JSON.parse(json)

			this.$store.commit('setUSer', null)

			if(!userData) {
				this.validToken = false
				return this.$router.push({ name: 'Auth' })
			}

			try {
				const authUser = await axios.post(`${baseUrlApi}/validateToken`, userData)
				if(authUser.data) {
					this.$store.commit('setUSer', userData)
				} else {
					localStorage.removeItem(userKey)
					this.$router.push({ name: 'Auth' })
				}
			} catch(err) {
				localStorage.removeItem(userKey)
				this.$router.push({ name: 'Auth' })
			}

			this.validToken = false
		}
	},

	computed: mapState(['menuIsVisible', 'user'])
}
</script>

<style>
	* {
		font-family: "Lato", sans-serif;
	}

	body {
		margin: 0px;
	}

	#app {
        -webkit-font-smoothing: antialiased;
        -webkit-osx-font-smoothing: grayscale;

        height: 100vh;
        display: grid;
        grid-template-rows: 60px 1fr 40px;
        grid-template-columns: 300px 1fr;
        grid-template-areas: 
            "header header"
            "menu content"
            "menu footer";        
    }

	#app.hide-menu {
		grid-template-areas: 
            "header header"
            "content content"
            "footer footer"; 
	}
</style>