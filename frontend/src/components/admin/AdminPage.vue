<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema" sub="Cadastros & Cia"/>
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Artigos">
                        <Article/>
                    </b-tab>
                    <b-tab title="Categorias">
                        <Category/>
                    </b-tab>
                    <b-tab title="Usuários">
                        <User/>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '@/components/template/PageTitle'
import Article from './ArticleAdmin'
import Category from './CategoryAdmin'
import User from './UserAdmin'

export default {
    name: "AdminPage",
    components: { PageTitle, Article, Category, User }
}
</script>

<style>

</style>
