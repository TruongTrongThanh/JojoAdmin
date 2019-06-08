import Vue from 'vue'
import App from './App.vue'
import router from './router'

let v = new Vue({
  router,
  el: "#app",
  created() {
    // Prevent blank screen in Electron builds
    this.$router.push('/')
  },
  render: h => h(App)
})