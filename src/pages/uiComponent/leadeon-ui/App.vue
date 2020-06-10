<template>
  <div  id="app">
    <router-link to="/" v-if="visible" class="back"><span class="back-icon"></span></router-link>
    <h1 class="title">{{ title }}</h1>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    visible() {
      return ['/'].indexOf(this.$route.path) < 0;
    },
    title () {
      return this.$route.name === 'navbar' ? 'leadeon-ui' : this.$route.name
    }
  }
}
</script>

<style lang="scss">
@import './assets/leadeon-ui-sprite.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
  .title {
    line-height: 120px;
    font-size: 40px;
    background-color: #f9f9f9;
  }
  .back {
    z-index: 999999;
    position: absolute;
    left: 10px;
    top: 20px;
    padding: 20px;
    .back-icon {
      content: "";
      display: block;
      transform: rotate(180deg);
      @include sprite('left');
    }
  }
  .page-all-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 200px;
  }
  button {
    margin-top: 40px;
    display: block;
    padding: 10px 50px;
    max-width: 600px;
    background-color: #fff;
    border-radius: 5px;
    border: 2px solid #ccc;
    background-color: #f0f0f0;
  }
  .page-have {

  }
}

</style>
