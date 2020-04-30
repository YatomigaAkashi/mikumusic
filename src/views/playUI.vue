<template>
    <div class="playUI">
        <div class="bck" :style="{'background-image': 'url(' + bck + ')'}"></div>
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
                return 'data:image/png;base64,' + this.currentPlayingMusic.img
            }
        },
        methods: {
            updateBackgroundImage() {
            }
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
        .bck
            width 100%
            height 100%
            position absolute
            top 0
            left 0
            filter blur(30px) brightness(80%)
            background-position center
            background-repeat no-repeat
            background-size cover
            z-index 1
        .control
            margin-bottom 10px
</style>