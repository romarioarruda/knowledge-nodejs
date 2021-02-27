<template>
    <div class="footer">
        <span>Copyright 
            <strong id="boss">Romário Arruda</strong>
            &copy; {{ new Date().getFullYear() }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style>
    .footer {
        grid-area: footer;
        background-color: #ddd;
        color: #333;

        display: flex;
        justify-content: center;
        align-items: center;
        padding-right: 10px;
    }

    #boss{
        color: red;
    }
</style>