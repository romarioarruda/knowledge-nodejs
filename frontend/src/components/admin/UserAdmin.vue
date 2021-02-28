<template>
    <div class="user-admin">
        <b-form class="mb-4">
            <input id="user-id" type="hidden" v-model="user.id">
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="username">
                        <b-form-input ide="username" type="text"
                            placeholder="Informe o nome do usuário"
                            :readonly="mode === 'remove'"
                            v-model="user.name">
                        </b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="E-mail:" label-for="email">
                        <b-form-input ide="email" type="email"
                            placeholder="Informe o e-mail do usuário" 
                            :readonly="mode === 'remove'"
                            v-model="user.email">
                        </b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-form-checkbox id="user-admin"
                v-show="mode === 'save'"
                v-model="user.admin" 
                class="mt-3 mb-3">
                Administrador?
            </b-form-checkbox>
            <b-row v-show="mode === 'save'">
                <b-col md="6" sm="12">
                    <b-form-group label="Senha:" label-for="password">
                        <b-form-input ide="password" type="password"
                            placeholder="Informe a senha a usuário" 
                            v-model="user.password">
                        </b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Confirmar a senha:" label-for="confirme">
                        <b-form-input ide="confirme" type="password"
                            placeholder="Confirme a senha" 
                            v-model="user.confirmPassword">
                        </b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-form>
        <b-table striped hover :fields="fields" :items="users">
            <template slot="cell(actions)" slot-scope="data">
                <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadUser(data.item, 'remove')" class="mr-2">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import { baseUrlApi, showError } from '@/global'
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
        },

        reset() {
            this.mode = 'save'
            this.user = {}
            this.loadUsers()
        },

        save() {
            const method = this.user.id ? 'put' : 'post'
            const id = this.user.id ? `/${this.user.id}` : ''

            axios[method](`${baseUrlApi}/users${id}`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },

        remove() {
            const id = this.user.id

            axios.delete(`${baseUrlApi}/users/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },

        loadUser(user, mode = 'save') {
            this.mode = mode
            this.user = { ...user }
        }
    }
}
</script>

<style>

</style>
