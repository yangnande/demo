<template>
  <div class="page-all-button">
      <button @click="showLoading">Loading 1s钟后自动消失</button>
  </div>
</template>

<script>
import {leadeon_Loading, leadeon_EndLoading} from 'utils/leadeon-ui'

export default {
  methods: {
    showLoading () {
      leadeon_Loading()
      setTimeout(() => {
        leadeon_EndLoading()
      }, 1000)
    }
  }
}
</script>

<style>

</style>
