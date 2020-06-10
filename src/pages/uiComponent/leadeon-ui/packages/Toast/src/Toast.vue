<template>
  <div id="leadeon-toast">
    <div :class="['main', { 'main-with-icon': type }]">
      <i :class="iconClass" v-if="type"></i>
      <p>{{msg}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['msg', 'type'],
  computed: {
    iconClass () {
      let iconClass
      switch (this.type) {
        case 'success':
          iconClass = 'icon-success'
          break
        case 'error':
          iconClass = 'icon-error'
          break
        case 'warning':
          iconClass = 'icon-warning'
          break
        default:
          console.log('请输入正确的参数信息！')
          console.log('leadeon_Toast方法icon类型参数只支持 success, error, warning')
      }
      return iconClass
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../assets/leadeon-ui-sprite.scss';
  #leadeon-toast {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .main {
    max-width: 600px;
    font-size: 30px;
    line-height: 40px;
    padding: 37px 60px;
    background: rgba(0, 0, 0, .8);
    border-radius: 12px;
    color: #fff;
    text-align: center;
    animation: jordan 2.2s;
  }
  .main-with-icon {
    width: 300px;
    max-height: 238px;
  }
  i {
    display: block;
    width: 56px;
    height: 56px;
    margin: 0 auto 25px;
  }
  .icon-success {
    @include sprite('success')
  }
  .icon-error {
    @include sprite('error')
  }
  .icon-warning {
    @include sprite('warning')
  }
  @keyframes jordan {
    0% {
      opacity: 0;
    }
    35% {
      opacity: 1;
    }
    75% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
