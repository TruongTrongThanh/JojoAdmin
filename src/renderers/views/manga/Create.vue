<template>
  <div class="manga-create container">
    <form>
      <label name="id">ID</label>
      <input v-model="manga.id" class="form-control" type="text">

      <label name="name">Tên</label>
      <input v-model="manga.id" class="form-control" type="text">

      <label name="subName">Tên phụ</label>
      <input v-model="manga.id" class="form-control" type="text">
      
      <label name="author">Tác giả</label>
      <input v-model="manga.id" class="form-control" type="text">
      
      <label name="banner">Hình banner</label>
      <image-input v-model="manga.banner"/>
      
      <label name="backBarImgSrc">Hình ở danh sách</label>
      <image-input v-model="manga.backBarImgSrc"/>
      
      <label name="chapterNumber">Số lượng chương</label>
      <input v-model="manga.chapterNumber" class="form-control" type="text">
      
      <label name="desc">Mô tả</label>
      <input v-model="manga.desc" class="form-control" type="text">
      
      <label name="genres">Thể loại</label>
      <genre-list :list.sync="manga.genres"/>
      
      <label name="yearStart">Năm</label>
      <input v-model="manga.yearStart" class="form-control" type="text">

      <button class="btn btn-primary" @click.prevent="submit">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Manga } from '@/models/manga'
import * as MangaAPI from '@/apis/manga-api'
import ImageInput from '@Com/ImageInput.vue'
import GenreList from '@Com/GenreList.vue'

@Component({
  components: {
    ImageInput,
    GenreList
  }
})
export default class MangaCreate extends Vue {
  manga: Manga = {
    id: '',
    name: '',
    subName: '',
    author: '',
    banner: '',
    backBarImgSrc: '',
    chapterNumber: 0,
    transChapterNumber: 0,
    chapterList: [],
    desc: '',
    genres: [],
    yearStart: 0,
    yearEnd: 0,
    createdAt: new Date(),
    modifiedAt: new Date()
  }

  submit() {
    MangaAPI.addManga(this.manga)
  }
}
</script>

<style scoped lang="scss">
</style>
