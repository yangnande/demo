<template>
  <div class="page-all-button">
      <button @click="showToast">toast</button>
      <button @click="showIconToast">带icon的toast</button>
  </div>
</template>

<script>
import {leadeon_Toast} from 'utils/leadeon-ui'

export default {
  methods: {
    showToast () {
      leadeon_Toast('一般的toast')
    },
    showIconToast () {
      leadeon_Toast('成功的提示', 'success')
    }
  }
}
</script>

<style>

</style>
