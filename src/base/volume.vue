<template>
    <div id="volumeBar">
        <input type="range" id="volumeRange" min="0" max="100" v-model="vol" :style="{'background': backgroundColor}" @input="updateVol">
    </div>
</template>

<script>
    export default {
        props: {},
        data() {
            return {
                vol: 100
            }
        },
        computed: {
            backgroundColor() {
                return 'linear-gradient(to right, #059CFA, white ' + (this.vol/100)*100 + '%, white)'
            }
        },
        methods: {
            updateVol() {
                this.$emit('updateVol', this.vol)
            }
        }
    }
</script>

<style scoped lang="stylus">
    #volumeBar
        height 30px
        #volumeRange
            -webkit-appearance none
            width 120px
            height 6px
            border-radius 3px
            background-color white
            vertical-align middle
        #volumeRange
            outline none
        #volumeRange::-webkit-slider-thumb
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