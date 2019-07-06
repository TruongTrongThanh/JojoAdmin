<template>
  <div class="chapter-create">
    <div class="form-group">
      <label for="name">Tên</label>
      <input v-model="chapter.name" id="name" class="form-control" type="text">
    </div>
    <div class="form-group">
      <label>Hình</label>
      <image-input v-model="chapter.cardImgSrc"/>
    </div>
    <div class="form-group">
      <label for="manga">Manga</label>
      <select v-model="mangaRef" class="form-control" id="manga">
        <option value="diamond-is-unbreakable">diamond-is-unbreakable</option>
        <option value="vento-aureo">vento-aureo</option>
      </select>
    </div>
    <div class="form-group">
      <label for="page-list">Danh sách URL</label>
      <textarea v-model="paperListURL" class="form-control" id="page-list" rows="20"></textarea>
    </div>

    <button class="btn btn-primary" @click.prevent="submit">Submit</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ImageInput from '@Com/ImageInput.vue'
import { Chapter } from '@/models/manga'
import * as MangaAPI from '@/apis/manga-api'

@Component({
  components: {
    ImageInput
  }
})
export default class ChapterCreate extends Vue {
  chapter: Chapter = {
    id: '',
    name: '',
    cardImgSrc: '',
    paperListSize: 0,
    createdAt: new Date(),
    modifiedAt: new Date()
  }

  paperListURL: string = ''
  mangaRef: string = ''

  submit() {
    // MangaAPI.add
  }
}
</script>

<style scoped lang="scss">
</style>
