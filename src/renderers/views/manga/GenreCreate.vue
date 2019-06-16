<template>
  <div class="genre-control container">
    <form>
      <div class="form-group">
        <label name="id">Tên</label>
        <input v-model="genre.name" class="form-control" type="text">

        <label name="name">Màu</label>
        <input v-model="genre.color" class="form-control" type="color">

        <button @click="add">Thêm</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Genre } from '@/models/manga'
import * as mangaAPI from '@/apis/manga-api'

@Component
export default class GenreCreate extends Vue {
  genre: Genre = {
    name: '',
    color: ''
  }

  add() {
    mangaAPI.addGenre(this.genre)
    this.genre = { name: '', color: '' }
  }
}
</script>

<style scoped lang="scss">
</style>
