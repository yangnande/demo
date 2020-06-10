<template>
  <div class="nav-tab-main" :class="{ceiling: isTop}">
    <div class="together-box" :class="{fixed: tabFixed}">
      <div class="nav-tab-box">
        <ul class="nav-tab-wrapper">
          <li class="nav-bar-item"
              v-for="(title, index) in data"
              :key="index"
              :class="{active: index === tabActive}"
              >
            <a href="javascript:;">
              <span class="item-name" @click="jumpList(index, $event), setBarStyle($event)"><span class="name">{{ title }}</span></span>
            </a>
          </li>
          <span class="active-bar" :style="barActiveStyle"></span>
        </ul>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'leadeon_NavBar',
  props: {
    data: {
      type: Array
    },
    useIndex: {
      type: Number,
      default: 0
    },
    isTop: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      tabAnimateInterval: null,
      tabActive: 0,
      tabFixed: false,
      activeStyle: { // tab 下边导航 bar 的内联样式
        width: '0px',
        transform: 'translateX(0px)'
      }
    }
  },
  created () {
    this.tabActive = this.useIndex
  },
  computed: {
    // 使用计算属性，使 tab 下边导航 bar 内联样式实时相应
    barActiveStyle () {
      return this.activeStyle
    }
  },
  mounted () {
    if (this.data.length > 1) {
      // 判断浏览器是否支持 position:sticky, 不支持使用 scroll 实现吸顶效果
      if (!this.cssSupport('position', 'sticky') && !this.cssSupport('position', '-webkit-sticky') && this.isTop) {
        console.log('不支持 position:sticky, 使用 scroll 实现吸顶效果')
        let navBarBox = document.querySelector('.nav-tab-main')
        navBarBox.style.height = navBarBox.clientHeight + 'px'
        window.addEventListener('scroll', this.setTabFixed, false)
      }
      // 设置 bar 下边导航条初始样式
      document.querySelectorAll('.item-name')[this.tabActive].click()
      setTimeout(() => {
        document.querySelector('.active-bar').style.transition = 'all .3s'
      }, 10)
    }
  },
  methods: {
    // 点击 tab
    jumpList (index, el) {
      this.tabScrollAnimate(index, el)
    },
    // 设置 tab 底部导航 bar 的内联样式
    setBarStyle (el) {
      this.activeStyle.width = `${el.target.children[0].offsetWidth}px`
      this.activeStyle.transform = `translateX(${el.target.offsetLeft + el.target.children[0].offsetLeft}px)`
    },
    // tab 滚动计算
    tabScrollAnimate (num, el) {
      if (num !== this.tabActive) {
        this.tabActive = num
        this.$emit('change', num)
        // tab 所有子元素
        const tabItem = document.querySelectorAll('.nav-bar-item')
        // 只有 tab 大于4个时才会有滚动动画
        if (tabItem.length > 4) {
          // box
          const tabBox = document.querySelector('.nav-tab-box')
          // box 宽度的一半，用于计算滚动距离
          const boxWidthHalf = tabBox.offsetWidth / 2
          // 可滚动的最远距离
          const maxScrollLeft = tabBox.scrollWidth - tabBox.offsetWidth
          // 当前要滚动的位置 = 当前元素offsetLeft + 当前元素一半的宽度 - box宽度的一半
          let toSL = el.target.offsetLeft + (el.target.offsetWidth / 2) - boxWidthHalf // itemWidth * (num + 0.5) - boxWidthHalf
          // 最小不能超过 0， 最大不能超过 maxScrollLeft
          if (toSL < 0) toSL = 0
          if (toSL > maxScrollLeft) toSL = maxScrollLeft
          // 目前滚动条的距离
          const nowSL = tabBox.scrollLeft
          // 每步位移量
          let step = ~~((toSL - nowSL) / 15)
          step = step > 0 ? Math.ceil(step) : Math.floor(step)
          // 清除上次滚动
          if (this.tabAnimateInterval) {
            cancelAnimationFrame(this.tabAnimateInterval)
          }
          // 设置滚动
          step !== 0 && this.tabStepAnimate(toSL, step)
        }
      }
    },
    // tab 滚动动画
    tabStepAnimate (toSL, step) {
      let stepNOW = document.querySelector('.nav-tab-box').scrollLeft + step
      if (Math.abs(stepNOW - toSL) <= Math.abs(step)) {
        stepNOW = toSL
      }
      // console.log('tab', toSL, stepNOW)
      document.querySelector('.nav-tab-box').scrollLeft = stepNOW
      if (stepNOW !== toSL) {
        this.tabAnimateInterval = requestAnimationFrame(() => {
          this.tabStepAnimate(toSL, step)
        })
      }
    },
    // 设置 tab 悬停
    setTabFixed () {
      this.tabFixed = document.querySelector('.nav-tab-main').getBoundingClientRect().top < 0
    },
    // 检测是否支持特定 css 属性
    cssSupport (attr, value) {
      let element = document.createElement('div')
      if (attr in element.style) {
        element.style[attr] = value
        return element.style[attr] === value
      } else {
        return false
      }
    }
  },
  watch: {
    isTop () {
      if (!this.cssSupport('position', 'sticky') && !this.cssSupport('position', '-webkit-sticky')) {
        if (this.isTop) {
          window.addEventListener('scroll', this.setTabFixed, false)
        } else {
          window.removeEventListener('scroll', this.setTabFixed, false)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ceiling {
  position: sticky;
  top: -2px;
}
.fixed {
  z-index: 9;
  position: fixed;
  top: 0;
  left: 0;
}

.nav-tab-main {
  z-index: 9;
  background-color: #fff;
  .together-box {
    width: 100%;
    background-color: #fff;
  }
  .nav-tab-box {
    position: relative;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
    .nav-tab-wrapper {
      display: flex;
      height: 90px;
      .active-bar {
        position: absolute;
        left: 0;
        bottom: 12px;
        width: 100%;
        height: 6px;
        background-image: linear-gradient(-90deg, #a761ee 30%, #ff68da 100%),
          linear-gradient(#fff, rgba(255, 255, 255, 0.089));
        background-blend-mode: normal, normal;
        box-shadow: 0px 3px 12px 0px #dca6ff;
        border-radius: 3px;
        // transition: all .3s;
      }
      .nav-bar-item {
        flex: 1;
        min-width: 168px;
        text-align: center;
        a {
          display: flex;
          justify-content: center;
          align-items: center;
          .item-name {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: column;
            padding: 0 10px;
            position: relative;
            height: 90px;
            font-size: 30px;
            color: rgba(0,0,0,.5);
            .name {
              max-width: 130px;
              line-height: 90px;
              text-align: center;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              pointer-events: none;
            }
          }
        }
      }
      .active {
        a {
          .item-name {
            color: #000;
            font-size: 32px;
          }
        }
      }
    }
  }
}
</style>
