import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentPlayingMusic: {},
        audio: {},
        playingState: false,
        currentLyricTime: 0,
        localMusicList: [],
        playingMusicList: [],
    },
    mutations: {
        setCurrentPlayingMusic(state, music) {
            state.currentPlayingMusic = music
        },
        setAudio(state, audio) {
            state.audio = audio
        },
        playingStateToggle(state, bool) {
            state.playingState = bool
        },
        setCurrentLyricTime(state, time) {
            state.currentLyricTime = time
        },
        setLocalMusicList(state, list) {
            state.localMuiscList = list
        },
        setPlayingMusicList(state, list) {
            state.playingMusicList = list
        }
    },
    actions: {
    },
    modules: {
    }
})
