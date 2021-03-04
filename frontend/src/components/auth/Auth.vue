<template>
    <div class="auth-content">
        <div class="auth-modal">
            <img src="@/assets/nextar.png" width="200" alt="Logo">
            <hr>
            <div class="auth-title">{{ showSignup ? 'Cadastro' : 'Login' }}</div>

            <input v-if="showSignup" type="text" class="form-control" v-model="user.name" placeholder="Nome" />
            <input type="email" class="form-control" v-model="user.email" placeholder="E-mail" />
            <input type="password" class="form-control" v-model="user.password" placeholder="Senha" />
            <input v-if="showSignup" type="password" class="form-control"
                v-model="user.confirmPassword" placeholder="Confirme a senha" />

            <button v-if="showSignup" @click="signup" class="btn btn-outline-primary mb-3">Registrar</button>
            <button v-else @click="signin" class="btn btn-outline-primary mb-3">Entrar</button>

            <a href @click.prevent="showSignup = !showSignup">
                <span v-if="showSignup">Já tem cadastro? Acesse o Login!</span>
                <span v-else>Não tem cadastro? Registre-se aqui!</span>
            </a>
        </div>
    </div>
</template>

<script>
import { baseUrlApi, showError, userKey } from '@/global'
import axios from 'axios'

export default {
    name: 'Auth',
    data() {
        return {
            showSignup: false,
            user: {}
        }
    },
    methods: {
        signin() {
            const url = `${baseUrlApi}/signin`
            axios.post(url, this.user).then(resp => {
                this.$store.commit('setUSer', resp.data)
                localStorage.setItem(userKey, JSON.stringify(resp.data))
                this.$router.push({ path: '/' })
            })
            .catch(showError)
        },

        signup() {
            const url = `${baseUrlApi}/signup`
            axios.post(url, this.user).then(() => {
                this.$toasted.global.defaultSuccess()
                this.user = {}
                this.showSignup = false
            })
            .catch(showError)
        }
    }
}
</script>

<style>
    .auth-content {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .auth-modal {
        background-color: #fff;
        width: 350px;
        padding: 35px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .auth-title {
        font-size: 1.2rem;
        font-weight: 100;
        margin-top: 10px;
        margin-bottom: 15px;
    }

    .auth-modal input {
        border: 1px solid #bbb;
        width: 100%;
        margin-bottom: 15px;
        padding: 3px 8px;
        outline: none;
    }

    .auth-modal hr {
        border: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to right,
            rgba(120, 120, 120, 0),
            rgba(120, 120, 120, 0.75),
            rgba(120, 120, 120, 0)
        );
    }

    .auth-modal a, .auth-modal a:hover {
        text-decoration: none;
    }
</style>