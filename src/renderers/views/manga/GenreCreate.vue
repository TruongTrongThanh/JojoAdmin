<template>
  <div class="genre-control container">
    <form>
      <div class="form-group">
        <label name="id">Tên</label>
        <input v-model="genre.name" class="form-control" type="text">

        <label name="name">Màu</label>
        <input v-model="genre.color" class="form-control" type="color">

        <button @click.prevent="add">Thêm</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Genre } from '@/models/manga'
import { addGenre } from '@/apis/manga-api'
import { ElectronWindow } from '@/models/html-api'

declare let window: ElectronWindow

@Component
export default class GenreCreate extends Vue {
  genre: Genre = {
    name: '',
    color: '#000000'
  }

  async add() {
    try {
      await addGenre(this.genre)
      window.showDialog('Thêm thể loại thành công!')
      this.reset()
    } catch (e) {
      window.showErrorDialog(e)
    }
  }

  reset() {
    this.genre = { name: '', color: '#000000' }
  }
}
</script>

<style scoped lang="scss">
</style>
