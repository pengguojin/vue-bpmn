const Base = [{
    name: 'create.user-task',
    group: 'model',
    className: 'icon-custom user-task',
    title: '创建一个类型为user-task的任务节点',
    bpmnName: 'bpmn:UserTask',
    url: '@/assets/userTask.png',
    attr: { x: 0, y: 0, width: 48, height: 48 }
},{
    name: 'create.start-task',
    group: 'model',
    className: 'icon-custom start-task',
    title: '创建一个开始节点',
    bpmnName: 'bpmn:StartEvent',
    url: '@/assets/start.png',
    attr: { x: 0, y: 0, width: 40, height: 40 }
},{
    name: 'create.end-task',
    group: 'model',
    className: 'icon-custom end-task',
    title: '创建一个结束节点',
    bpmnName: 'bpmn:EndEvent',
    url: '@/assets/end.png',
    attr: { x: 0, y: 0, width: 40, height: 40 }
}]
export { Base }
