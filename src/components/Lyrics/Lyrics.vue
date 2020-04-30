<template>
    <div class="Lyrics">
        <ul v-if="lyrics">
            <li v-for="val in lyric">
                {{val}}
            </li>
        </ul>
    </div>
</template>

<script>
    import { ipcRenderer as ipc } from 'electron'
    export default {
        props: {},
        data() {
            return {
                lyrics: null,
                lyric: [],
                tlyric: []
            }
        },
        computed: {},
        mounted() {
            ipc.on('load-lyrics', (event, args) => {
                this.lyrics = JSON.parse(args)
                this.lyric = this.parseLyrics(this.lyrics.lrc.lyric)
                this.tlyric = this.parseLyrics(this.lyrics.tlyric.lyric)
            })
        },
        methods: {
            parseLyrics(str) {
                let reg = /\[(.*?):(.*?)\.(.*?)](.*)/
                let arr = str.split('\n')
                arr = arr.map(val => {
                    return reg.exec(val)
                })
                return arr.map(val => {
                    if(val && val[4]) {
                        return val[4]
                    }
                    return ''
                })
            }
        }
    }
</script>

<style scoped lang="stylus">
    .Lyrics
        width 100%
        height 100%
        ul
            display block
            width 80%
            height 80%
            text-align center
            overflow hidden
            li
                display block
                width 100%
                height 20px
</style>