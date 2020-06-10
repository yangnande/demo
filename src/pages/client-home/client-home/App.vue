<template>
  <div class="main" ref="main">
    <swiper :options="swiperOption" ref="mySwiper" class="banner" v-if="adverData.length>0">
      <!-- slides -->
      <swiper-slide v-for="v in adverData" :key="v.markId">
        <img :src="v.imageUrl" alt="">
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
      <!-- <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-scrollbar" slot="scrollbar"></div> -->
    </swiper>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { getsaleAdver } from './getData'
export default {
  name: 'App',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      adverData: [] // 轮播数据
    }
  },
  computed: {
    swiperOption () {
      if (this.adverData.length > 1) { // 只有一张图时不轮播
        return { // swiper配置
          loop: true, // 无限轮播
          autoplay: 1000, // 自动切换的时间间隔
          autoplayDisableOnInteraction: false, // 用户操作swiper之后，是否禁止autoplay。默认为true：停止。
          pagination: '.swiper-pagination', // 分页器容器
          onClick: this.getIndex
        }
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    /**
     * 初始化
     */
    async init () {
      this.getsaleAdverData()
    },
    getIndex () {
      console.log(this.$refs.mySwiper.swiper.realIndex, 'realIndex')
      console.log(this.$refs.mySwiper.swiper.activeIndex, 'activeIndex')
    },
    async getsaleAdverData () {
      let data = await getsaleAdver()
      if (data.retCode === '000000') {
        this.adverData = data.rspBody.adverList
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
  height: 500px;
}

/deep/
  .swiper-container-horizontal
  > .swiper-pagination-bullets
  .swiper-pagination-bullet {
  width: 16px;
  height: 8px;
  background-color: #ffffff;
  opacity: 0.5;
  border-radius: 4px;
  margin: 0 12px;
}
/deep/
  .swiper-container-horizontal
  > .swiper-pagination-bullets
  .swiper-pagination-bullet-active {
  width: 30px;
  opacity: 1;
}
</style>
