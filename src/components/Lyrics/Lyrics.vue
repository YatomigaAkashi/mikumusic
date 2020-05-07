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
    import { mapState, mapMutations } from 'vuex'
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
            ...mapState(['playingState', 'currentLyricTime', 'currentPlayingMusic', 'audio'])
        },
        watch: {
            lyric(val, pre) {
                if(pre.lines) {
                    pre.stop()
                }
                if (this.playingState === true) {
                    val.play()
                }
                this.$refs.lyricList.scrollTo(0, 0, 1000)
                this.currentLineIndex = 0
            },
            playingState() {
                if (this.playing === false) {
                    this.lyric.play()
                    this.playing = true
                } else {
                    this.lyric.togglePlay()
                }
            },
            currentLyricTime(time) {
                this.lyric.seek(this.audio.currentTime * 1000)
            },
            currentPlayingMusic(val) {
                ipc.send('load-lyric', val.lyric)
            }
        },
        mounted() {
            this._initIPC()
        },
        components: {
            Scroll
        },
        methods: {
            ...mapMutations(['setCurrentLyricTime']),
            _initIPC() {
                ipc.on('load-lyric-reply', (event, args) => {
                    this.lyrics = JSON.parse(args)
                    this.lyric = new lyricParser(this.lyrics.lrc.lyric, this.lyricListen)
                })
            },
            lyricListen({lineNum, txt}) {
                this.currentLineIndex = lineNum
                if(lineNum > 4) {
                    let lineEl = this.$refs.lyricLine[lineNum - 4]
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
            width 60%
            height 80%
            margin-top 10%
            margin-left 15%
            cursor move
            .list
                display block
                text-align center
                overflow hidden
                p
                    display block
                    width 100%
                    min-height 20px
                    line-height 30px
                    opacity .5
</style>