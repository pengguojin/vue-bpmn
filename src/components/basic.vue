<template>
  <div class="containers">
    <el-button @click="saveXml">查看xml</el-button>
    <el-button @click="addElement">测试更新元素</el-button>
    <div class="canvas" ref="canvas"></div>
  </div>
</template>

<script>
// 引入相关的依赖
import CustomModeler from './customModeler'
import { xmlStr } from '@/mock/xmlStr' // 这里是直接引用了xml字符串
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
        // // 监听 modeler
        // this.addModelerListener()
        // 监听 element
        this.addEventBusListener()

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
      const elementRegistry = this.bpmnModeler.get('elementRegistry');
      const modeling = this.bpmnModeler.get('modeling')
      const moddle = this.bpmnModeler.get('moddle')
      eventTypes.forEach(eventType => {
        eventBus.on(eventType, (e) => {
          if (eventType === 'element.click') {
            const shape = e.element ? elementRegistry.get(e.element.id) : e.shape;
            if (shape.type === "bpmn:UserTask") {
              // 在UserTask节点上添加/修改元素
              modeling.updateProperties(shape, {
                "flowable:assignee": '我是修改后的Task名称'
              })

              //在UserTask节点内部添加/修改元素
              const properties = moddle.create('flowable:Button', { value: '1', label: '测试', display: false })
              modeling.updateProperties(shape, { documentation: [properties]})
            }

          }
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
    },
    addElement() {
      // const modeling = this.bpmnModeler.get('modeling')
      // modeling.updateProperties(this.element, properties)
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
/*.panel{*/
/*  position: absolute;*/
/*  right: 0;*/
/*  top: 0;*/
/*  width: 300px;*/
/*}*/

</style>
