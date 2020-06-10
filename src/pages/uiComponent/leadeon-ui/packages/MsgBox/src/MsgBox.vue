<template>
  <div id="leadeon-msgbox">
    <div class="main">
      <div class="content" v-if="isString">{{msg}}</div>
      <div class="content" v-else>
        <p v-for="(item, index) in msg" :key="index">{{item}}</p>
      </div>
      <div class="btm onepx">
        <div class="cancel" v-if="showCancelBtn" @click="cancel">{{cancelText}}</div>
        <div :class="{ confirm: !showCancelBtn }" @click="confirm">{{confirmText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['msg', 'confirmText', 'showCancelBtn', 'cancelText', 'cancelFn', 'confirmFn'],
  methods: {
    cancel () {
      const magBoxDom = document.querySelector('#leadeon-msgbox')
      magBoxDom.parentNode.removeChild(magBoxDom)
      if (this.cancelFn) this.cancelFn()
    },
    confirm () {
      const magBoxDom = document.querySelector('#leadeon-msgbox')
      magBoxDom.parentNode.removeChild(magBoxDom)
      if (this.confirmFn) this.confirmFn()
    }
  },
  computed: {
    isString () {
      return typeof this.msg === 'string'
    }
  }
}
</script>

<style lang="scss" scoped>
  #leadeon-msgbox {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, .6);
    animation: kobe .7s;
  }
  .main {
    width: 540px;
    // height: 298px;
    background: #f6f6f6;
    border-radius: 12px;
    color: #333;
    font-size: 30px;
    line-height: 40px;
  }
  .content {
    // height: 210px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 45px 64px;
    p {
      width: 100%;
      text-align: center;
    }
  }
  .btm {
    height: 88px;
    border-top: 1Px solid #ddd;
    color: #0085d0;
    font-size: 32px;
    display: flex;
    div {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .confirm {
      width: 100%;
    }
  }
  .cancel {
    border-right: 1Px solid #ddd;
  }
  @keyframes kobe {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
