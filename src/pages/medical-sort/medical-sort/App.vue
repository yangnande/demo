<template>
  <div class="main" ref="main">
    <!-- 搜索框 -->
    <div class="search" ref="searchInput" @click="jumpSearch">
      <div class="input">请输入症状</div>
    </div>
    <div class="content" ref="content">
      <!-- 左侧导航 -->
      <NavBar ref="navBar"></NavBar>
      <!-- 右侧icon列表 -->
      <IconContent ref="iconContent"></IconContent>
    </div>
  </div>
</template>
<script>

import NavBar from './components/nav-bar'
import IconContent from './components/icon-content'
import {getNavtationAllData} from './getData'
import {openNewPage, host, getUserInfo, getAtInfo} from '../../../utils/common'
import {mapState} from 'vuex'
import { Toast } from 'mint-ui'
export default {
  name: 'App',
  components: {
    NavBar,
    IconContent
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['userInfo', 'allData', 'height'])
  },
  mounted () {
    this.init()
  },
  methods: {
    /**
     * 初始化
     */
    async init () {
      // 获取用户信息
      this.$store.state.userInfo = await getUserInfo()
      this.getElementHeight()
      this.getData()
    },
    /**
     * 设置左侧导航和右侧列表的高度
     */
    getElementHeight () {
      let searchInput = this.$refs.searchInput.offsetHeight
      this.$store.state.height = searchInput
      let main = this.$refs.main.offsetHeight
      this.$refs.content.style.height = (main - searchInput) + 'px'
    },
    /**
     * 保存左侧导航和右侧列表的数据
     */
    async getData () {
      let data = null
      // 获取柜机id
      let atmInfo = await getAtInfo()
      const rsqBody = { atmId: atmInfo.atmId }
      if (atmInfo.atmId) {
        data = await getNavtationAllData(this.userInfo, rsqBody)
        if (data.retCode === '000000') {
          this.$store.state.allData = data.rspBody
        } else {
          Toast({message: data.retDesc, duration: 2000})
        }
      } else {
        Toast({ message: '附近暂无药柜', duration: 2000 })
      }
    },
    /**
     * 跳转到搜索页面
     */
    jumpSearch () {
      openNewPage(host + 'products/products-search.html')
    }
  }
}
</script>

<style lang="scss" scoped>
  .main {
    height: 100%;
  }
  .search {
    padding: 56px 20px 26px 20px;
    background-image: linear-gradient(0deg,#30bfbf 0%,#30bfbf 100%),linear-gradient(#64d7d0,#64d7d0);
    background-blend-mode: normal,normal;
    .input{
      // width: 710px;
      height: 60px;
      line-height: 60px;
      border-radius: 30px;
      color: #cddce2;
      font-size: 22px;
      padding-left: 314px;
      background: url("./assets/search.PNG") no-repeat 41% 50%;
      background-size: 23px 23px;
      background-color: #ffffff;
    }
  }
  .content {
    width: 100%; // 解决页面宽度溢出问题
    height: 100%;
    display: flex;
  }
</style>
