<template>
  <header class="header">
      <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
          <i class="fa fa-lg" :class="icon"></i>
      </a>
      <h1 class="title" v-if="hasUser">
          <i class="fa fa-home"></i>
          <router-link to="/">{{title}}</router-link>
      </h1>
      <UserDropDown v-if="!hideUserDropDown"/>
  </header>
</template>

<script>
import UserDropDown from './UserDropDown'

export default {
    name: "Header",
    components: { UserDropDown },
    props: {
        title: String,
        hideToggle: Boolean,
        hideUserDropDown: Boolean
    },
    methods: {
        toggleMenu () {
            this.$store.commit('toggleMenu')
        }
    },
    computed: {
        icon () {
            return this.$store.state.menuIsVisible ? 'fa-angle-left' : 'fa-angle-down'
        },

        hasUser() {
            return this.$store.state.user
        }
    }
}
</script>

<style>
    .header {
        grid-area: header;
        background: linear-gradient(to right, #1e469a, #49a7c1);

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title {
        font-size: 1.2rem;
        color: #fff;
        font-weight: 100;
        flex-grow: 1;
        text-align: center;
    }

    .title a {
        color: #fff !important;
        text-decoration: none !important;
    }

    header.header > a.toggle {
        width: 60px;
        height: 100%;
        color: #fff;

        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    header.header > a.toggle:hover {
        background-color: rgba(0, 0, 0, 0.2);
        color: #fff;
        text-decoration: none;
    }
</style>