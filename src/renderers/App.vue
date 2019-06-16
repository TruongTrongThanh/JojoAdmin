<template>
  <div class="entry-point">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import 'bootstrap/dist/css/bootstrap.min.css'

@Component
export default class App extends Vue {}
</script>

<style lang="scss">
</style>