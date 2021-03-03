<template>
    <div class="articles-by-category">
        <PageTitle icon="fa fa-folder-o" :main="category.name" sub="Categoria" />
        <ul>
            <li v-for="article in articles" :key="article.id">
                <ArticleItem :article="article" />
            </li>
        </ul>
        <div class="load-more">
            <button v-if="loadMore" class="btn btn-outline-primary" @click="getArticles">
                Carregar mais artigos
            </button>
        </div>
    </div>
</template>

<script>
import { baseUrlApi } from '@/global'
import axios from 'axios'
import PageTitle from '@/components/template/PageTitle'
import ArticleItem from './ArticleItem'

export default {
    name: "ArticleByCategory",
    components: { PageTitle, ArticleItem },
    data() {
        return {
            category: {},
            articles: [],
            page: 1,
            loadMore: true
        }
    },
    mounted() {
        if (parseInt(this.$route.params.id)) {
            this.category.id = this.$route.params.id
            this.getCategory()
            this.getArticles()
        }
    },
    methods: {
        getCategory() {
            const url = `${baseUrlApi}/categories/${this.category.id}`
            axios.get(url).then(resp => this.category = resp.data[0])
        },
        
        getArticles() {
            const url = `${baseUrlApi}/categories/${this.category.id}/articles?page=${this.page}`
            axios.get(url).then(resp => {
                this.articles = this.articles.concat(resp.data)

                this.page++

                if(resp.data.length === 0) this.loadMore = false
            })
        }
    }
}
</script>

<style>
    .articles-by-category ul {
        list-style-type: none;
        padding: 0px;
    }

    .articles-by-category .load-more {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        margin-top: 30px;
    }
</style>
