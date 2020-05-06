<template>
    <div class="playUI">
        <transition name="bck-anim" >
            <div class="bck" :style="{'background-image': bck_image_base64? bck_image_base64: bckImage}"></div>
        </transition>
        <div class="play_name" style="z-index: 2">
            <div class="music_name">{{currentPlayingMusic.name}}</div>
            <div class="music_author">{{currentPlayingMusic.author}}</div>
        </div>
        <player-view style="z-index: 2"></player-view>
        <player-control class="control" style="z-index: 2"></player-control>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import PlayerView from "components/PlayerView/PlayerView"
    import PlayerControl from "components/PlayerControl/PlayerControl"

    export default {
        props: {},
        data() {
            return {
                bckImage: 'linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%)'
            }
        },
        components: {
            PlayerControl, PlayerView
        },
        watch: {
        },
        computed: {
            ...mapState(['currentPlayingMusic']),
            bck() {
                if (!this.currentPlayingMusic.img) {
                   return false
                }
                return 'data:image/png;base64,' + this.currentPlayingMusic.img.base64
            },
            bck_image_base64() {
                if (!this.bck) {
                    return false
                }
                return  'url(' + this.bck + ')'
            }
        },
        methods: {
            updateBackgroundImage() {}
        }
    }
</script>

<style scoped lang="stylus">
    .playUI
        width 100%
        height 100%
        position absolute
        top 0
        left 0
        display flex
        flex-flow column nowrap
        justify-content space-between
        overflow hidden
        .bck
            width 100%
            height 100%
            position absolute
            top 0
            left 0
            filter blur(30px) brightness(80%)
            transform scale(1.5)
            background-position center
            background-repeat no-repeat
            background-size cover
            z-index 1
        .play_name
            position absolute
            top 40px
            left 40px
            .music_name
                height 30px
                line-height 30px
                font-size $ya-font-normal
                font-family fz503
                font-weight normal
            .music_author
                height 20px
                line-height 20px
                font-size 14px
                font-family "Segoe UI"
                font-weight lighter
        .control
            margin-bottom 10px

    .bck-anim-enter-active, .bck-anim-leave-active {
        transition: opacity .5s;
    }
    .bck-anim-enter, .bck-anim-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>