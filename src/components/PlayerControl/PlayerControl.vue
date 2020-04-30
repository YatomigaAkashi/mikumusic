<template>
    <div id="playerControl">
        <div class="player">
            <div class="prev" @click="prev">
                <span>prev</span>
            </div>
            <div class="play" @click="play">
                <span>{{state}}</span>
            </div>
            <div class="next" @click="next">
                <span>next</span>
            </div>
        </div>
        <div class="progress-bar">
            <div>
                <span class="time">{{curTime}}</span>
            </div>
            <div>
                <progress-bar ref="progressBar" @dragMusic="dragMusic" :max="music.max"
                    @playEnd="playEnd" @updateProgress="updateProgress"
                >
                </progress-bar>
            </div>
            <div>
                <span class="time">{{endTime}}</span>
            </div>
        </div>

        <div class="volume">
            <div class="volume-text">
                <span>volume</span>
            </div>
            <div>
                <volume @updateVol="updateVol" class="volumeControl"></volume>
            </div>
        </div>
        <div class="cycle-mode">
            <img :src="playMode" alt="" @click="updatePlayMode" class="play-mode">
        </div>
    </div>
</template>

<script>
    import ProgressBar from '@/base/ProgressBar'
    import Volume from '@/base/volume'
    import { mapState } from 'vuex'

    export default {
        props: {},
        data() {
            return {
                state: 'play',
                music: {
                    play: false,
                    min: 0,
                    max: 0,
                    val: 0,
                },
                playModeList: [{
                    mode: 'order',
                    name: 'musiclib2.png'
                }, {
                    mode: 'loop',
                    name: 'listloop.png'
                }, {
                    mode: 'singleLoop',
                    name: 'loop1.png'
                }, {
                    mode: 'Shuffle',
                    name: 'random_play.png'
                }],
                currentPlayMode: 0
            }
        },
        computed: {
            ...mapState(['audio']),
            curTime() {
                return this.s_to_hs(this.music.val)
            },
            endTime() {
                return this.s_to_hs(this.music.max)
            },
            playMode() {
                if(this.playModeList.length === 0) {
                    return '#'
                }
                return require('../../common/icons/' + this.playModeList[this.currentPlayMode].name)
            }
        },
        watch: {
            audio(val) {
                this.music.max = Math.floor(val.duration)
            }
        },
        components: {
            ProgressBar, Volume
        },
        mounted() {
            this.progressBar = this.$refs.progressBar
        },
        methods: {
            // 播放音乐
            play(arg) {
                if(this.state === 'play' || arg === 'play') {
                    this.audio.play()
                    this.state = 'pause'
                    this.progressBar.playSlider()
                } else if(this.state === 'pause') {
                    this.audio.pause()
                    this.state = 'play'
                    this.progressBar.stopSlider()
                }
            },
            // 播放上一曲
            prev() {},
            // 播放下一曲
            next() {},
            // 秒转分:秒
            s_to_hs(s){
                let h
                h = Math.floor(s / 60) + ''
                s = s % 60 + ''
                h = h.length === 1? `0${h}`: h
                s = s.length === 1? `0${s}`: s
                return `${h}:${s}`
            },
            // 更新进度条
            updateProgress(arg) {
                this.music.val = arg
            },
            // 拖动进度条播放音乐
            dragMusic(arg) {
                this.state = 'pause'
                this.audio.currentTime = arg
                this.audio.play()
            },
            // 拖动进度条调整声音
            updateVol(arg) {
                this.audio.volume = arg / 100
            },
            updatePlayMode() {},
            nextByPlayMode() {},
            // 单曲重复播放
            playEnd() {
                this.progressBar.init()
                this.progressBar.playSlider()
                this.audio.currentTime = 0
                this.audio.play()
            }
        }
    }
</script>

<style scoped lang="stylus">
    #playerControl
        width 100%
        height $ya-top-height
        font-size $ya-font-normal
        font-family WorkSans
        color white
        display flex
        flex-flow row nowrap
        justify-content space-between
        align-items center
        .player
            display flex
            flex-flow row nowrap
            justify-content space-between
            align-items center
            margin-left 30px
            >div
                cursor pointer
                width 80px
                text-align center
                transition all .3s ease
            >div:hover
                transform scale(1.4)
        .progress-bar
            display flex
            flex-flow row nowrap
            justify-content space-between
            align-items center
            font-size $ya-font-small
            >div
                margin-right 20px
                >span
                    vertical-align center
        .volume
            display flex
            flex-flow row nowrap
            justify-content space-between
            align-items center
            >div
                margin-right 20px
                .volumeControl
                    margin-top 5px
                >span
                    vertical-align center
        .cycle-mode
            margin-top 10px
            img
                width $ya-img-big
                margin-right 40px
                vertical-align center

    .time
        display block
        width 50px
</style>