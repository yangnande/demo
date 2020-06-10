<template>
  <ul class="nav">
    <li v-for="(item, index) in componentList.list" :key="index"><router-link :to="item.path">{{ item.name }}</router-link></li>
  </ul>
</template>

<script>
import navList from '../nav.config.json'
export default {
  name: 'navbar',
  data () {
    return {
      componentList: null
    }
  },
  created () {
    this.componentList = navList
  },
  methods: {
    jump () {
      this.$router.push('/leadeon_Toast')
    }
  }
}
</script>

<style lang="scss">
@import '../assets/leadeon-ui-sprite.scss';

.nav {
  width: 100%;
  line-height: 100px;
  font-size: 30px;
  text-align: left;
  li {
    position: relative;
    &:nth-child(2n) {
      background-color: #f1f1f1;
    }
    &::after {
      position: absolute;
      right: 10px;
      top: 30px;
      content: "";
      display: block;
      @include sprite('left')
    }
    a {
      padding: 0 20px;
      display: block;
      width: 100%;
      color: #333;
    }
  }
}
</style>
