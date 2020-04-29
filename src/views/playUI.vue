<template>
    <div class="playUI">
        <div style="height: 100px"></div>
        <player-control class="control"></player-control>
    </div>
</template>

<script>
    import PlayerControl from "components/PlayerControl/PlayerControl"

    export default {
        props: {},
        data() {
            return {}
        },
        components: {
            PlayerControl
        },
        methods: {}
    }
</script>

<style scoped lang="stylus">
    .playUI
        width 100%
        height 100%
        background-image linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%)
        position absolute
        top 0
        left 0
        display flex
        flex-flow column nowrap
        justify-content space-between
        .control
            margin-bottom 10px
</style>