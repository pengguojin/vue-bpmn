<template>
  <div class="containers" :class="{ 'view-mode': isView }">
    <el-container style="height: 100%">
      <el-header style="border-bottom: 1px solid rgb(218 218 218);height: auto;">
        <el-button :size="size" @click="saveXml">查看xml</el-button>
        <el-button :size="size" @click="addElement">测试更新元素</el-button>
        <el-button :size="size" icon="el-icon-zoom-in" @click="zoomViewport(true)">放大</el-button>
        <el-button :size="size" icon="el-icon-zoom-out" @click="zoomViewport(false)">缩小</el-button>
        <el-button :size="size" icon="el-icon-back" @click="bpmnModeler.get('commandStack').undo()">后退</el-button>
        <el-button :size="size" icon="el-icon-right" @click="bpmnModeler.get('commandStack').redo()">前进</el-button>
        <el-button :size="size" icon="el-icon-rank" @click="fitViewport">自适应屏幕</el-button>
        <div class="canvas" ref="canvas"></div>
      </el-header>
      <el-container style="align-items: stretch">
        <el-main style="padding: 0;">
          <div class="canvas" ref="canvas"></div>
        </el-main>
        <el-aside style="width: 100px; min-height: 650px; background-color: #f0f2f5">
          我是右侧面板
<!--          <panel v-if="modeler" :modeler="modeler" :users="users" :groups="groups" :categorys="categorys" />-->
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 引入相关的依赖
import CustomModeler from '../utils/customModeler'
import { xmlStr } from '@/mock/xmlStr' // 这里是直接引用了xml字符串
import flowableModule from '../mock/flowable.json'
import getInitStr from '@/utils/init'
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
      zoom: null,
      size: 'mini',
      isView: false
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
      this.createNewDiagram(getInitStr())
    },
    async createNewDiagram(data) {
      // 将字符串转换成图显示出来
      data = data.replace(/<!\[CDATA\[(.+?)]]>/g, function(match, str) {
        return str.replace(/</g, '&lt;')
      })
      console.log(data)
      const info = await this.bpmnModeler.importXML(xmlStr)
      if (info.warnings && info.warnings.length > 0) {
        console.error('出错', info)
      } else {
        this.fitViewport()
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
    },
    zoomViewport(zoomIn = true) {
      this.zoom = this.bpmnModeler.get('canvas').zoom()
      this.zoom += (zoomIn ? 0.1 : -0.1)
      this.bpmnModeler.get('canvas').zoom(this.zoom)
    },
    fitViewport() {
      this.zoom = this.bpmnModeler.get('canvas').zoom('fit-viewport')
      const oBox = document.querySelector('.containers .viewport').getBBox()
      const currentViewBox = this.bpmnModeler.get('canvas').viewbox()
      const elementMid = {
        x: oBox.x + oBox.width / 2 - 65,
        y: oBox.y + oBox.height / 2
      }
      this.bpmnModeler.get('canvas').viewbox({
        x: elementMid.x - currentViewBox.width / 2,
        y: elementMid.y - currentViewBox.height / 2,
        width: currentViewBox.width,
        height: currentViewBox.height
      })
      this.zoom = oBox.width / currentViewBox.width * 1.8
    },
  }
}
</script>
<style lang="scss" scoped>
@import '../../node_modules/bpmn-js/dist/assets/diagram-js.css';
@import '../../node_modules/bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
@import '../../node_modules/bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
@import '../../node_modules/bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
.view-mode {
  .el-header, .el-aside, .djs-palette, .bjs-powered-by {
    display: none;
  }
  .el-loading-mask {
    background-color: initial;
  }
  .el-loading-spinner {
    display: none;
  }
}
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
