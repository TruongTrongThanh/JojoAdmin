import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase/app'
import 'firebase/database'

// Firebase config
// const firebaseConfig = {
//   apiKey: process.env.VUE_APP_API_KEY,
//   databaseURL: process.env.VUE_APP_DATABASE_URL,
//   projectId: process.env.VUE_APP_PROJECT_ID
// }
// firebase.initializeApp(firebaseConfig)

const v = new Vue({
  router,
  el: '#app',
  created() {
    // Prevent blank screen in Electron builds
    this.$router.push('/')
  },
  render: h => h(App)
})
