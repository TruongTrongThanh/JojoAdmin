<template>
  <div class="login">
    this is login...
    <button @click="openDialog">Open</button>
    <router-link to="/">to index</router-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import electron, { MessageBoxOptions } from 'electron'
const { dialog } = electron.remote

@Component
export default class Login extends Vue {
  openDialog() {
    const options: MessageBoxOptions = {
      title: 'test title',
      message: 'test message'
    }
    dialog.showMessageBox(options)
  }
}
</script>

<style scoped lang="scss">
</style>