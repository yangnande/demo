<template>
  <div class="page-all-button">
      <button @click="showMsgBox">MsgBox</button>
      <button @click="showCallbackMsgBox">带确认回调的MsgBox</button>
      <button @click="showCelCallbackMsgBox">带取消回调的MsgBox</button>
  </div>
</template>

<script>
import {leadeon_MsgBox} from 'utils/leadeon-ui'

export default {
  methods: {
    showMsgBox () {
      leadeon_MsgBox({
        msg: '提示框'
      })
    },
    showCallbackMsgBox () {
      leadeon_MsgBox({
        msg: '带回调的提示框',
        confirmText: '确认',
        confirmFn: function () {
          alert('这是回调信息')
        }
      })
    },
    showCelCallbackMsgBox () {
      leadeon_MsgBox({
        msg: '带回调的提示框',
        confirmText: '确认',
        showCancelBtn: true,
        cancelText: '取消',
        confirmFn: function () {
          alert('这是确认回调信息')
        },
        cancelFn: function () {
          alert('这是取消回调信息')
        }
      })
    },
  }
}
</script>

<style>

</style>
