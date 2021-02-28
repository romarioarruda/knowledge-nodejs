<template>
    <div class="user-dropdown">
        <div class="user-button">
            <span class="d-none d-sm-block">{{user.name}}</span>
            <div class="user-dropdown-img">
                <VueGravatar :email="user.email" alt="user avatar"/>
            </div>
            <i class="fa fa-angle-down"></i>
        </div>
        <div class="user-dropdown-content">
            <router-link to="/admin"><i class="fa fa-cogs"></i> Administração</router-link>
            <a href><i class="fa fa-sign-out"></i> Sair</a>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import VueGravatar from 'vue-gravatar'

export default {
    name: 'UserDropDown',
    components: {
        VueGravatar
    },
    computed: mapState(['user'])
}
</script>

<style>
    .user-dropdown {
        height: 100%;
        position: relative;
    }

    .user-dropdown:hover{
        background-color: rgba(0, 0, 0, 0.2);
        cursor: pointer;
    }

    .user-button {
        display: flex;
        align-items: center;
        color: #fff;
        font-weight: 100;
        height: 100%;
        padding: 0px 20px;
    }

    .user-dropdown-img {
        margin: 0px 10px;
    }

    .user-dropdown-img > img {
        max-height: 37px;
        border-radius: 20px;
    }

    .user-dropdown-content {
        position: absolute;
        right: 0px;
        background-color: #f9f9f9;
        min-width: 170px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        padding: 10px;
        z-index: 10;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.3s linear;
    }

    .user-dropdown:hover .user-dropdown-content{
        visibility: visible;
        opacity: 1;
    }

    .user-dropdown-content a  {
        text-decoration: none;
        color: #000;
        padding: 10px;
    }

    .user-dropdown-content a:hover {
        background-color: #ededed;
        color: #000;
        text-decoration: none;
    }
</style>
