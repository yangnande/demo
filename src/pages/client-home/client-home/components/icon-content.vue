<template>
  <div class="main" ref="main">
    <div class="list" ref="list" @scroll="activeScrollTop($event)">
      <div class="list-content" v-for='(v,i) in allData.catalogInfo' :key='i' ref="item">
        <div class="item-title">{{v.navigationName}}</div>
        <div class="item-container" >
          <div class="item-content ellipsis" v-for='(value,index) in v.catagoryInfo' :key='index' @click="jumpList(value)">{{value.catagoryName}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {host, openNewPage} from '../../../../utils/common'
export default {
  components: {

  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['allData', 'navIndex', 'height', 'isActive'])
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
     *  滚动动态设置左侧导航的激活下标
     */
    activeScrollTop (e) {
      this.$store.state.isActive = true
      let scrollTop = Math.ceil(e.target.scrollTop)
      let items = this.$refs.item
      let remainHeight = items[0].offsetTop
      for (var i = 0; i < items.length; i++) {
        if (scrollTop >= items[i].offsetTop - remainHeight) {
          this.$store.state.navIndex = i
        }
      }
    },
    /**
     * 左侧navbar触发右侧内容列表滚动
     */
    passiveScroll () {
      if (!this.isActive) {
        this.$refs.list.scrollTop = this.$refs.item[this.navIndex].offsetTop - this.$refs.item[0].offsetTop
      }
    },
    /**
     * 点击icon跳转列表页
     */
    jumpList (v) {
      openNewPage(host + 'products/products-list.html?catagoryId=' + v.catagoryId + '&catagoryName=' + v.catagoryName)
    }
  },
  watch: {
    navIndex: function () {
      this.passiveScroll()
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  width: 520px;
  height: 100%;
  overflow-y: scroll;
  background-color: #fff;
  // border-radius: 10px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
  padding: 20px 30px 20px 20px;
  margin-top: 15px;
  border-left: 10px solid #51ceca;
  .list-content {
    .item-title {
      text-align: center;
    }
    .item-container {
      display: flex;
      flex-wrap: wrap;
      .item-content {
        width: 180px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        background-color: #f5f5f5;
        border-radius: 30px;
        color: #333333;
        font-size: 24px;
        margin: 30px 25px 20px 25px;
      }
    }
  }
  .list-content:last-child {
    min-height: 101%;
  }
}
</style>
