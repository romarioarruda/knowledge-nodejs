<template>
    <div class="article-admin">
        <b-form class="mb-4">
            <input id="article-id" type="hidden" v-model="article.id">
            <b-form-group label="Titulo:" label-for="article-name">
                <b-form-input ide="article-name" type="text"
                    placeholder="Escreva o titulo do artigo"
                    :readonly="mode === 'remove'"
                    v-model="article.name">
                </b-form-input>
            </b-form-group>
            <b-form-group label="Subtitulo:" label-for="article-description">
                <b-form-input ide="article-description" type="text"
                    placeholder="Escreva o subtitulo do artigo"
                    :readonly="mode === 'remove'"
                    v-model="article.description">
                </b-form-input>
            </b-form-group>
            <b-form-group label="Imagem(URL):" label-for="article-url">
                <b-form-input ide="article-url" type="text"
                    placeholder="Cole o link da imagem"
                    :readonly="mode === 'remove'"
                    v-model="article.imageUrl">
                </b-form-input>
            </b-form-group>
            <b-form-group label="Categoria:" label-for="article-categoryId">
                <b-form-select id="article-categoryId" :disabled="mode === 'remove'"
                    :options="categories" v-model="article.categoryId">
                </b-form-select>
            </b-form-group>
            <b-form-group label="Autor:" label-for="article-userId">
                <b-form-select id="article-userId" :disabled="mode === 'remove'"
                    :options="users" v-model="article.userId">
                </b-form-select>
            </b-form-group>
            <b-form-group label="Conteúdo:" label-for="article-content" v-show="mode === 'save'">
                <VueEditor v-model="article.content"
                    placeholder="Escreva o conteúdo do artigo"/>
            </b-form-group>

            <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-form>
        <b-table striped hover :fields="fields" :items="articles">
            <template slot="cell(actions)" slot-scope="data">
                <b-button variant="warning" @click="loadArticle(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadArticle(data.item, 'remove')" class="mr-2">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
        <b-pagination size="md"
            first-text="⏮"
            prev-text="⏪"
            next-text="⏩"
            last-text="⏭"
            v-model="page"
            :total-rows="count"
            :per-page="limit"
        />
    </div>
</template>

<script>
import { baseUrlApi, showError } from '@/global'
import { VueEditor } from 'vue2-editor'
import axios from 'axios'

export default {
    name: 'ArticleAdmin',
    components: { VueEditor },
    data() {
        return {
            mode: 'save',
            article: {},
            articles: [],
            categories: [],
            users: [],
            page: 1,
            limit:0,
            count:0,
            fields: [
                { key: 'id', label: 'Código', sortable: true},
                { key: 'name', label: 'Titulo', sortable: true},
                { key: 'actions', label: 'Ações'},
            ]
        }
    },
    mounted() {
        this.loadArticles()
        this.loadCategories()
        this.loadUsers()
    },
    methods: {
        loadArticles() {
            const url = `${baseUrlApi}/articles?page=${this.page}`

            axios.get(url).then(resp => {
                this.articles = resp.data.data
                this.count = resp.data.count
                this.limit = resp.data.limit
            })
        },

        loadCategories() {
            const url = `${baseUrlApi}/categories`
            axios.get(url).then(resp => {
                this.categories = resp.data.map(category => {
                    return { value: category.id, text: category.path }
                })
            })
        },

        loadUsers() {
            const url = `${baseUrlApi}/users`
            axios.get(url).then(resp => {
                this.users = resp.data.map(user => {
                    return { value: user.id, text: `${user.name} - ${user.email}` }
                })
            })
        },

        reset() {
            this.mode = 'save'
            this.article = {}
            this.loadArticles()
        },

        save() {
            const method = this.article.id ? 'put' : 'post'
            const id = this.article.id ? `/${this.article.id}` : ''

            axios[method](`${baseUrlApi}/articles${id}`, this.article)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },

        remove() {
            const id = this.article.id

            axios.delete(`${baseUrlApi}/articles/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },

        loadArticle(article, mode = 'save') {
            this.mode = mode

            axios.get(`${baseUrlApi}/articles/${article.id}`)
                .then(resp => this.article = resp.data)
        }
    },
    watch: {
        page() {
            this.loadArticles()
        }
    }
}
</script>

<style>

</style>
