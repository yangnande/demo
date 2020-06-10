<template>
  <div class="page-have">
    <button @click="isTop = !isTop">{{ isTop ? '当前吸顶' : '当前不吸顶' }}</button> <span class="ts">点击按钮切换吸顶效果</span>
    <leadeon_NavBar :data="testBarData" :useIndex="tabActive" v-on:change="changeNum" class="bgf" :isTop="isTop"></leadeon_NavBar>
    <ul class="content">
      <li v-for="(item, index) in testBarData" :key="index" v-show="index === tabActive" class="content-item">{{ item + index }}</li>
    </ul>
  </div>
</template>

<script>
import { leadeon_NavBar } from 'utils/leadeon-ui'
export default {
  components: {
    leadeon_NavBar
  },
  data () {
    return {
      testBarData: [
        '标题',
        '标题',
        '标题',
        '标题',
        '标题',
        '标题'
      ],
      tabActive: 0,
      isTop: true
    }
  },
  methods: {
    changeNum (num) {
      this.tabActive = num
      console.log(num)
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  display: inline!important;
}
.ts {
  font-size: 20px;
  color: #999;
}
.bgf {
  margin-top: 40px;
  background-color: #f0f0f0!important;
}
.content {
  width: 100%;
}
.content-item {
  height: 1900px;
  line-height: 800px;
  font-size: 150px;
}
</style>
