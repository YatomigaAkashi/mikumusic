<template>
    <div id="playerCanvas">
        <canvas ref="canvas" width="600" height="600"></canvas>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        props: {
            audio: {
                type: Object,
                default: {}
            }
        },
        data() {
            return {}
        },
        watch: {
            audio(val) {
                this._init_audio_context(val)
            }
        },
        computed: {
            ...mapState(['audio','currentPlayingMusic'])
        },
        mounted() {
            this.canvas = this.$refs.canvas
        },
        methods: {
            // web audio初始化
            _init_audio_context(audio) {
                let ac = new AudioContext()
                let src = ac.createMediaElementSource(audio)
                let analyser = ac.createAnalyser()
                src.connect(analyser)
                let clearAnim
                analyser.fftSize = 2048
                let voiceFre = new Uint8Array(analyser.frequencyBinCount)
                let requestAnimationFrame = window.requestAnimationFrame
                let _this = this
                function update() {
                    analyser.getByteFrequencyData(voiceFre)
                    _this.draw(_this, voiceFre)
                    clearAnim = requestAnimationFrame(update)
                }
                clearAnim = requestAnimationFrame(update)
                analyser.connect(ac.destination)
            },
            // 绘图
            draw(_this, arr) {
                // 初始化
                let {width, height} = _this.canvas
                let ctx = _this.canvas.getContext('2d')
                // 清除上次绘制内容
                ctx.clearRect(0, 0, width, height)
                // 样式类型声明
                let line = _this.ya_lines(ctx, height)[0]
                // 画内圈
                let cycl_height = height * arr[0] / 256 / 12
                _this.ya_stroke_round(width / 2, height / 2, 100 + cycl_height * 1.4, line, 1, ctx)
                // 画外圆
                _this.ya_stroke_arc__lines(width, height, line, arr, ctx)
            },

            // 线条类型
            ya_lines(ctx, height) {
                let line = ctx.createLinearGradient(0, 0, 0, height)
                line.addColorStop(0, 'rgba(21,153,87,0.6)')
                line.addColorStop(1, 'rgba(21,87,153,0.6)')
                return [line]
            },
            // 圆形边框
            ya_stroke_round(x, y, r, style, lineWidth, ctx) {
                ctx.save()
                ctx.strokeStyle = style
                ctx.lineWidth = lineWidth
                ctx.beginPath()
                ctx.arc(x, y, r, 0, Math.PI * 2)
                ctx.stroke()
                ctx.restore()
            },
            // 绘制外圆
            ya_stroke_arc__lines(width, height, line, arr, ctx) {
                ctx.save()
                // 阴影
                ctx.shadowBlur = 6
                ctx.shadowColor = "#00BFFF"
                ctx.strokeStyle = line
                let rot = 0 // 起始角度
                let L_rot = 0.005 // 终止角度
                let step = 1
                // 画外圆
                for(let i = 3; i <= 156; i++){
                    let cur = arr[(i - 2) * step]
                    let rectHeight = cur / 256 * height
                    let valfix = rectHeight / 4 - 65

                    ctx.beginPath()
                    ctx.globalAlpha = 0.75
                    ctx.lineWidth = valfix > 0? valfix: 1
                    ctx.arc(width / 2,height / 2,200,
                      rot * Math.PI,L_rot * Math.PI)
                    ctx.stroke()
                    rot += 0.013
                    L_rot = rot + 0.005
                }
                ctx.restore()
            }
        }
    }
</script>

<style scoped lang="stylus">
    canvas
        display block
</style>