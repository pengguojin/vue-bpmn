const customElements = ['bpmn:UserTask', 'bpmn:StartEvent',
    'bpmn:EndEvent', 'bpmn:ParallelGateway', 'bpmn:ExclusiveGateway',
    'bpmn:InclusiveGateway'] // 自定义元素的类型
const customConfig = { // 自定义元素的配置(后面会用到)
    'bpmn:UserTask': {
        'url': require('../assets/userTask.png'),
        'attr': { x: 0, y: 0, width: 48, height: 48 }
    },
    'bpmn:StartEvent': {
        'url': require('../assets/start.png'),
        'attr': { x: 0, y: 0, width: 40, height: 40 }
    },
    'bpmn:EndEvent': {
        'url': require('../assets/end.png'),
        'attr': { x: 0, y: 0, width: 40, height: 40 }
    },
    'bpmn:ParallelGateway': {
        'url': require('../assets/parallelGateway.png'),
        'attr': { x: 0, y: 0, width: 40, height: 40 }
    },
    'bpmn:ExclusiveGateway': {
        'url': require('../assets/exclusiveGateway.png'),
        'attr': { x: 0, y: 0, width: 40, height: 40 }
    },
    'bpmn:InclusiveGateway': {
        'url': require('../assets/inclusiveGateway.png'),
        'attr': { x: 0, y: 0, width: 40, height: 40 }
    }
}
const hasLabelElements = ['bpmn:StartEvent', 'bpmn:EndEvent'] // 一开始就有label标签的元素类型
export { customElements, customConfig, hasLabelElements }
