<template>
  <div id="doughnut" :style="doughnutStyle()">
    <div class="outer" :style="outerStyle()">
      <div v-for="(item, index) in toolArr" :key="index" class="item" :style="itemStyle(index)"></div>
      <div class="inner" :style="innerStyle()"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'leadeon_DrawDoughnut',
  data () {
    return {
      toolArr: []
    }
  },
  props: ['outerDiameter', 'innerDiameter', 'itemsProportion', 'itemsColor'],
  created () {
    this.toolArr.length = 720
  },
  computed: {
    outerSize () {
      return this.outerDiameter
    },
    innerSize () {
      return this.innerDiameter
    },
    proportions () {
      return this.itemsProportion || []
    },
    colors () {
      return this.itemsColor
    }
  },
  methods: {
    doughnutStyle () {
      const width = 'width: ' + this.outerSize / 46.875 + 'rem;'
      return width
    },
    outerStyle () {
      const width = 'width: ' + this.outerSize / 46.875 + 'rem;'
      const height = 'height: ' + this.outerSize / 46.875 + 'rem;'
      return width + height
    },
    itemStyle (index) {
      const height = 'height:' + Math.PI * this.outerSize / 720 / 46.875 + 'rem;'
      const rotate = 'transform: rotate(' + index / 2 + 'deg);' + '-webkit-transform: rotate(' + index / 2 + 'deg);'
      const width = 'width: ' + this.outerSize / 2 / 46.875 + 'rem;'
      let color = ''
      for (let i = 0; i < this.proportions.length; i++) {
        let start = 0
        for (let j = 0; j < i; j++) {
          start += Number(this.proportions[j])
        }
        const end = start + Number(this.proportions[i])
        if (index >= start * 7.2 && index < end * 7.2) {
          color = 'background: ' + this.colors[i] + ';'
        }
      }
      return height + rotate + width + color
    },
    innerStyle () {
      const width = 'width: ' + this.innerSize / 46.875 + 'rem;'
      const height = 'height: ' + this.innerSize / 46.875 + 'rem;'
      return width + height
    }
  }
}
</script>

<style lang="scss" scoped>
  #doughnut {
    .outer {
      border-radius: 50%;
      position: relative;
      .inner {
        border-radius: 50%;
        background: #ffffff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .item {
        border-top-left-radius: 10%;
        border-bottom-left-radius: 10%;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        transform-origin: right bottom;
      }
    }
  }
</style>
