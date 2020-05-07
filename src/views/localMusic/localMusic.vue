<template>
    <div class="local-music">
        <div class="Features">
            <label for="updateMusic">添加本地音乐</label>
            <input id="updateMusic" type="file" accept="audio/mpeg">
        </div>
        <div class="list">
            <table>
                <tr>
                    <td></td>
                    <td>音乐标题</td>
                    <td>歌手</td>
                    <td>专辑</td>
                </tr>
                <tr v-for="(val, index) in music">
                    <td align="center">{{index}}</td>
                    <td align="left">{{val.name}}</td>
                    <td align="left">{{val.author}}</td>
                    <td align="left">{{val.album}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { ipcRenderer as ipc } from "electron"

    export default {
        props: {

        },
        data() {
            return {
                music: []
            }
        },
        computed: {
            ...mapState(['localMusicList'])
        },
        watch: {
            localMusicList(val) {
                this.music = val
            }
        },
        mounted() {
            ipc.on('load-local-music', (event, args) => {
                this.music = args
            })
        },
        methods: {}
    }
</script>

<style scoped lang="stylus">
    .local-music
        width 100%
        .local-list
            width 100%
</style>