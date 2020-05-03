<template>
    <div class="Lyrics">
        <scroll :data="lyric.lines" ref="lyricList" class="scroll">
            <div class="list">
                <p ref="lyricLine" v-for="(val, index) in lyric.lines" :style="{'opacity': index !== currentLineIndex? '0.5': '1'}">{{val.txt}}</p>
            </div>
        </scroll>
    </div>
</template>

<script>
    import { ipcRenderer as ipc } from 'electron'
    import lyricParser from 'lyric-parser'
    import { mapState } from 'vuex'
    import Scroll from "@/base/scroll"

    export default {
        props: {},
        data() {
            return {
                lyrics: null,
                lyric: [],
                tlyric: [],
                currentLineIndex: 0,
                playing: false
            }
        },
        computed: {
            ...mapState(['playingState', 'currentLyricTime'])
        },
        watch: {
            playingState() {
                if(this.playing === false) {
                    this.lyric.play()
                    this.playing = true
                } else {
                    this.lyric.togglePlay()
                }
            },
            currentLyricTime(time) {
                this.lyric.seek(time * 1000)
            }
        },
        mounted() {
            ipc.on('load-lyrics', (event, args) => {
                this.lyrics = JSON.parse(args)
                this.lyric = new lyricParser(this.lyrics.lrc.lyric, this.lyricListen)
                this.tlyric = new lyricParser(this.lyrics.tlyric.lyric)
            })
        },
        components: {
            Scroll
        },
        methods: {
            lyricListen({lineNum, txt}) {
                this.currentLineIndex = lineNum
                if(lineNum > 5) {
                    let lineEl = this.$refs.lyricLine[lineNum - 5]
                    this.$refs.lyricList.scrollToElement(lineEl, 1000)
                } else {
                    this.$refs.lyricList.scrollTo(0, 0, 1000)
                }
            }
        }
    }
</script>

<style scoped lang="stylus">
    .Lyrics
        width 100%
        height 100%
        color white
        .scroll
            overflow hidden
            height 80%
            margin-top 10%
            .list
                display block
                text-align center
                overflow hidden
                p
                    display block
                    width 100%
                    height 20px
                    opacity .5
</style>