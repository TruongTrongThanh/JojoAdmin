<template>
  <div class="image-input">
    <div class="input-group mb-3">
      <input 
        :value="value"
        class="form-control"
        type="text"
        @input="$emit('input', $event.target.value)"
      >
      <div class="input-group-append">
        <label for="file" class="input-group-text">Generate URL from Image</label>
        <input 
          id="file"
          style="visibility:hidden;"
          type="file"
          @change="generateUrl"
        >
    </div>
</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import firebase from 'firebase'

@Component
export default class ImageInput extends Vue {
  @Prop(String) value: string = ''

  async generateUrl(e: any) {
    try {
      const storageRef = firebase.storage().ref()
      const file = e.target.files[0]
      const uploadTaskSnapshot = await storageRef.child('images/' + file.name).put(file)
      const url = uploadTaskSnapshot.ref.getDownloadURL()
      this.$emit('input', await url)
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
