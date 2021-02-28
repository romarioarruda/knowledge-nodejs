<template>
    <div class="user-admin">
        <b-table striped hover :fields="fields" :items="users"></b-table>
    </div>
</template>

<script>
import { baseUrlApi } from '@/global'
import axios from 'axios'

export default {
    name: 'UserAdmin',
    data() {
        return {
            mode: 'save',
            user: {},
            users: [],
            fields: [
                { key: 'id', label: 'Código', sortable: true},
                { key: 'name', label: 'Nome', sortable: true},
                { key: 'email', label: 'E-mail', sortable: true},
                { key: 'admin', label: 'Administrador', sortable: false,
                    formatter: value => value ? 'Sim' : 'Não'
                },
                { key: 'actions', label: 'Ações'},
            ]
        }
    },
    mounted() {
        this.loadUsers()
    },
    methods: {
        loadUsers() {
            const url = `${baseUrlApi}/users`
            axios.get(url).then(resp => this.users = resp.data)
        }
    }
}
</script>

<style>

</style>
