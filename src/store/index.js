import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentPlayingMusic: {
            name: '',
            url: ''
        },
        audio: {}
    },
    mutations: {
        setCurrentPlayingMusic(state, music) {
            state.currentPlayingMusic = music
        },
        setAudio(state, audio) {
            state.audio = audio
        }
    },
    actions: {
    },
    modules: {
    }
})
