<template>
  <div class="main" ref="main">
    <ul class="nav-list" ref="list">
      <li class="nav-item" ref="item" :class= '{active: navIndex == i}' v-for="(v,i) in allData.catalogInfo" :key="v" @click="changeIndex(i)">{{v.navigationName}}</li>
    </ul>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  components: {

  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['allData', 'navIndex', 'isActive'])
  },
  watch: {
    /**
     * 根据navIndex的变化，让左侧导航页随之滚动
     */
    navIndex: function () {
      let barH = this.$refs.item[0].offsetHeight * this.navIndex
      let boxH = this.$refs.list.offsetHeight
      let boxS = this.$refs.list.scrollTop
      if (barH >= boxS && barH <= boxH + boxS - 100) {
      } else {
        this.$refs.list.scrollTop = barH - boxH / 2
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    /**
     *  初始化数据
     */
    init () {
    },
    /**
     * 动态激活li的样式
     * index 下标
     */
    changeIndex (index) {
      if (this.navIndex !== index) {
        this.$store.state.navIndex = index
        this.$store.state.isActive = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-list {
  width: 200px;
  padding-top: 15px;
  height: 100%;
  overflow-y: scroll;
  .nav-item {
    margin-left: 10px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    color:#51ceca;
    font-size: 30px;
  }
}
.active {
  width: 200px;
  background-color: #51ceca;
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
  color: #fff!important;
}
</style>
