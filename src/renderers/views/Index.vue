<template>
  <div class="index">
    this is index
    <router-link to="/login">to login</router-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Index extends Vue {}
</script>

<style scoped lang="scss">
</style>