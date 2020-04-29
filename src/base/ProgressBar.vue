<template>
    <div>
        <input type="range" :max="max" :curValue="curVal" id="range"
               ref="progress" :style="{'background': backgroundColor}"
               @change="drag" @input="stopSlider" v-model="curVal"
        >
    </div>
</template>

<script>
    export default {
        props: {
            max: {
                type: Number,
                default: 100
            }
        },
        data() {
            return {
                range: {},
                stop: true,
                curVal: 0
            }
        },
        watch: {
            curVal(val) {
                if(val >= this.max) {
                    this.$emit('playEnd')
                }
                this.$emit('updateProgress', this.curVal)
            }
        },
        computed: {
            backgroundColor() {
                return 'linear-gradient(to right, #059CFA, white ' + Math.floor((this.curVal / this.max) * 100) + '%, white)'
            }
        },
        mounted() {
            this.running()
        },
        methods: {
            playSlider() {
                this.stop = false
            },
            stopSlider() {
                this.stop = true
            },
            running() {
                setInterval(() => {
                    if(this.stop === false) {
                        this.curVal++
                    }
                }, 1000)
            },
            init() {
                this.curVal = 0
                this.stop = true
            },
            drag(){
                this.stop = false
                this.$emit('dragMusic', this.curVal)
            }
        }
    }
</script>

<style scoped lang="stylus">
    .progress-bar
        height 30px
        #range
            -webkit-appearance none
            width 200px
            height 6px
            border-radius 3px
            vertical-align middle
        #range:focus
            outline none
        #range::-webkit-slider-thumb
            -webkit-appearance none
            cursor default
            height 18px
            width 18px
            margin-top -1px
            background: #ffffff
            border-radius 9px
            border solid 0.125em rgba(205, 224, 230, 0.5)
            box-shadow 0 .125em .125em #3b4547
</style>