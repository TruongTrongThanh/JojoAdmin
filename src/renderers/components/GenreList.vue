<template>
  <div class="genre-list">
    <div class="form-group" v-for="g in list" :key="g.name">
      <div 
        @contextmenu.prevent="openContextMenu(g)"
        class="form-check"
      >
        <input v-model="g.isCheck" class="form-check-input" type="checkbox">
        <label :style="`color: ${g.color};`" class="form-check-label">
          {{ g.name }}
        </label>
      </div>
    </div>
    <button class="btn btn-primary" @click.prevent="openGenreControl">Thêm</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import * as mangaAPI from '@/apis/manga-api'
import { Genre } from '@/models/manga'
import { ElectronWindow } from '@/models/html-api'

declare let window: ElectronWindow

@Component
export default class GenreList extends Vue {
  @Prop(Array) list: Genre[] = []

  created() {
    window.genreContextMenuResultBindEvent(this.delete)
    window.updateDataListener(this.updateGenreList)
    this.updateGenreList()
  }

  openContextMenu(g: Genre) {
    window.openGenreContextMenu(g)
  }

  async delete(g: Genre) {
    await mangaAPI.deleteGenre(g.name)
    const index = this.list.findIndex(genre => genre.name === g.name)
    this.list.splice(index, 1)
    this.$emit('update:list', this.list)
  }

  openGenreControl() {
    window.openGenreWindow()
  }

  async updateGenreList() {
    this.$emit('update:list', await mangaAPI.getGenreList())
  }
}
</script>

<style scoped lang="scss">
</style>
