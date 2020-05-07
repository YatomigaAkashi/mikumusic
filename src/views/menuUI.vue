<template>
    <div class="menuUI">
        <div class="nav">
            <div class="nav-pc">
                <router-link to="/local" class="nav-router">Local Music</router-link>
                <div class="nav-line-active"></div>
            </div>
        </div>
        <div class="line"></div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        props: {},
        data() {
            return {}
        },
        methods: {

        }
    }
</script>

<style scoped lang="stylus">
    a
        text-decoration none
        color black
        font-size 20px
        text-align center

    .menuUI
        width 100%
        height 100%
        background-color white
        position absolute
        top 0
        left 0
        >div
            margin 0 40px
        .nav
            margin-top 50px
            .nav-pc
                width 120px
                .nav-router
                    display block
                    height 30px
                    line-height 30px
                .nav-line-active
                    width 120px
                    height 2px
                    background-color #1fc6ea
        .line
            width calc(100% - 80px)
            height 1px
            background-color gray
            margin-top 5px
</style>