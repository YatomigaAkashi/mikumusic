import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      currentPlayingMusic: {
          name: '愛言葉Ⅲ',
          url: 'E:/电影/02-web全栈架构师四期（18年12月新版）/18课   NodeJS项目-第1天-{登录、注册}/08-ＮodeJS项目-第1天-{ 登录、注册 }/1-教学资料/resources/鎖那,なゆごろう - Love Potion.mp3'
      },
      audio: null
  },
  mutations: {
      setAudio(state, audio) {
          state.audio = audio
      }
  },
  actions: {
  },
  modules: {
  }
})
