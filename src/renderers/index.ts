import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import 'jquery'
import 'popper.js'
import 'bootstrap'

// Firebase config
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  projectId: process.env.FIREBASE_PROJECT_ID
}
firebase.initializeApp(firebaseConfig)

const v = new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
