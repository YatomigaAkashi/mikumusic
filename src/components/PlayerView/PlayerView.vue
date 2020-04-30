<template>
    <div id="PlayerView">
        <player-canvas></player-canvas>
        <lyrics></lyrics>
    </div>
</template>

<script>
    import Lyrics from "components/Lyrics/Lyrics"
    import PlayerCanvas from "components/PlayerCanvas/PlayerCanvas"

    export default {
        props: {},
        data() {
            return {}
        },
        components:{
            Lyrics, PlayerCanvas
        },
        methods: {}
    }
</script>

<style scoped lang="stylus">
    #PlayerView
        width 100%
        height calc(100% - 118px)
        margin-top 60px
        display flex
        flex-flow row nowrap
        justify-content space-between
        align-items center
</style>