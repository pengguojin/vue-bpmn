<template>
  <div class="containers">
    <div class="canvas" ref="canvas"></div>
  </div>
</template>

<script>
// 引入相关的依赖
import CustomModeler from './customModeler'
import { xmlStr } from '../mock/xmlStr' // 这里是直接引用了xml字符串
// const bpmnXml = require('../mock/diagram.bpmn')
import flowableModule from '../mock/flowable.json'
// import Modeler from 'bpmn-js/lib/Modeler'
export default {
  name: '',
  mounted() {
    this.init()
  },
  data() {
    return {
      // bpmn建模器
      bpmnModeler: null,
      container: null,
      canvas: null,
    }
  },
  methods: {
    init() {
      // 获取到属性ref为“canvas”的dom节点
      const canvas = this.$refs.canvas
      // 建模
      this.bpmnModeler = new CustomModeler({
        container: canvas,
        //添加控制板
        // propertiesPanel: {
        //   parent: '#js-properties-panel'
        // },
        additionalModules: [],
        moddleExtensions: {
          flowable: flowableModule
        }
      })
      this.createNewDiagram()
    },
    async createNewDiagram() {
      // 将字符串转换成图显示出来
      const info = await this.bpmnModeler.importXML(xmlStr)
      if (info.warnings && info.warnings.length > 0) {
        console.error('出错', info)
      } else {
        // 监听 modeler
        // this.addModelerListener()
        // 监听 element
        // this.addEventBusListener()
      }
    },
    addModelerListener() {
      // const bpmnjs = this.bpmnModeler
      const that = this
      const events = ['shape.added', 'shape.move.end', 'shape.removed', 'connect.end', 'connect.move']
      events.forEach(eventType => {
        that.bpmnModeler.on(eventType, () => {
          // if (eventType === 'shape.added') {
          //   console.log('新增了shape')
          // } else if (eventType === 'shape.move.end') {
          //   console.log('移动了shape')
          // } else if (eventType === 'shape.removed') {
          //   console.log('删除了shape')
          // } else {
          //   console.log(eventType, e)
          // }
        })
      })
    },
    addEventBusListener () {
      const eventBus = this.bpmnModeler.get('eventBus') // 需要使用eventBus
      const eventTypes = ['element.click', 'element.changed'] // 需要监听的事件集合
      eventTypes.forEach(eventType => {
        eventBus.on(eventType, () => {
          // console.log(eventType, e)
        })
      })
    },
    async saveXml() {
      try {
        const {xml} = await this.bpmnModeler.saveXML({format: true})
        console.log(xml)
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
<style scoped>
.containers{
  position: absolute;
  background-color: #ffffff;
  width: 100%;
  height: 100%;
}
.canvas{
  width: 100%;
  height: 100%;
}
.panel{
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
}

</style>
