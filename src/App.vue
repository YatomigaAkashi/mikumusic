<template>
    <div id="app">
        <top :menuShow="menuShow" @switch-lib="switchLib"></top>
        <play-u-i></play-u-i>
        <menu-u-i :class="menu_class" v-show="menuShowV" style="z-index: 10"></menu-u-i>
        <audio :src="currentPlayingMusic.music" ref="audio" @canplay="_initAudio"></audio>
    </div>
</template>

<script>
    import { ipcRenderer as ipc } from 'electron'
    import { mapState, mapMutations } from 'vuex'
    import Top from "components/Top/Top"
    import playUI from "views/playUI"
    import menuUI from "views/menuUI"

    export default {
        data() {
            return {
                menuShow: false,
                menuShowV: false
            }
        },
        watch: {
            menuShow(val) {
                if(val === true) {
                    this.menuShowV = true
                } else {
                    setTimeout(() => {
                        this.menuShowV = false
                    }, 510)
                }
            },
        },
        computed: {
            ...mapState(['currentPlayingMusic']),
            menu_class() {
                if (this.menuShow === false) {
                    return 'hide-menu'
                }
                return 'show-menu'
            },
        },
        mounted() {
            this._initIPC()
        },
        components: {
            Top, playUI, menuUI
        },
        methods: {
            ...mapMutations(['setAudio', 'setCurrentPlayingMusic', 'setLocalMusicList', 'setPlayingMusicList']),
            _initIPC() {
                ipc.on('load-local-music', (event, args) => {
                    this.setLocalMusicList(args)
                    this.setPlayingMusicList(args)
                })
            },
            _initAudio() {
                this.setAudio(this.$refs.audio)
            },
            switchLib() {
                this.menuShow = !this.menuShow
            }
        }
    }
</script>

<style lang="stylus">
    body, html, #app
        width 100%
        height 100%
        margin 0
        padding 0
    #app
        background gray
        position relative
        overflow hidden

    .show-menu
        animation show-menu .6s ease forwards
    .hide-menu
        animation hide-menu .5s ease forwards

    @keyframes show-menu
        from
            opacity 0
            transform scale(0.75)
        to
            opacity 1
            transform scale(1)
    @keyframes hide-menu
        from
            opacity 1
            transform scale(1)
        to
            opacity 0
            transform scale(1.16)
</style>
