<template>
  <div id="leadeon-loading">
    <div class="loading"></div>
  </div>
</template>

<style lang="scss" scoped>
  #leadeon-loading {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
  }
  .loading {
    width: 32px;
    height: 32px;
    border-right: 5px solid #eeeeee;
    border-bottom: 5px solid #eeeeee;
    border-left: 5px solid #36b7ff;
    border-top: 5px solid #36b7ff;
    border-radius: 50%;
    animation: harden .6s infinite linear;
    position: fixed;
    top: 50%;
    left: 50%;
    // transform: translate(-50%, -50%); // 会被rotate覆盖导致不居中
    margin: -16px 0 0 -16px;
    z-index: 9999;
  }
  @keyframes harden {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
