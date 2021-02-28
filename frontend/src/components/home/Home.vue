<template>
    <div>
        <PageTitle icon="fa fa-home" main="Dashboard" sub="Base de conhecimento"/>
        <div class="stats">
            <Stat title="Categorias" :value="stat.categories" icon="fa fa-folder" color="#d54d50"/>
            <Stat title="Artigos" :value="stat.articles" icon="fa fa-file" color="#3bc480"/>
            <Stat title="Usuários" :value="stat.users" icon="fa fa-user" color="#3282cd"/>
        </div>
    </div>
</template>

<script>
import PageTitle from '@/components/template/PageTitle'
import Stat from './Stat'
import axios from 'axios'
import { baseUrlApi } from '@/global'

export default {
    name: "Home",
    components: { PageTitle, Stat },
    data() {
        return {
            stat: {}
        }
    },
    mounted() {
        this.getStats()
    },
    methods: {
        getStats() {
            axios.get(`${baseUrlApi}/stats`).then(resp => this.stat = resp.data)
        }
    }
}
</script>

<style>
    .stats {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
</style>
