import { assign } from 'min-dash';

export default function PaletteProvider(bpmnFactory, create, elementFactory, palette,
                                        translate, handTool, lassoTool, spaceTool, globalConnect) {
    this.bpmnFactory = bpmnFactory;
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;
    this.handTool = handTool;
    this.lassoTool = lassoTool;
    this.spaceTool = spaceTool;
    this.globalConnect = globalConnect;

    palette.registerProvider(this);
}

PaletteProvider.prototype.getPaletteEntries = function() {
    const {
        bpmnFactory,
        create,
        elementFactory,
        translate,
        handTool,
        lassoTool,
        spaceTool,
        globalConnect
    } = this;

    function createAction(type, group, className, title) {
        function createTask(event) {
            const businessObject = bpmnFactory.create(type, { custom: 2 });
            const shape = elementFactory.createShape({ type: type, businessObject });
            create.start(event, shape);
        }

        return {
            group: group,
            className: className,
            title: translate(title),
            action: {
                dragstart: createTask,
                click: createTask
            }
        };
    }

    function createSubprocess(event) {
        const subProcess = elementFactory.createShape({
            type: 'bpmn:SubProcess',
            x: 0,
            y: 0,
            isExpanded: true
        });

        const startEvent = elementFactory.createShape({
            type: 'bpmn:StartEvent',
            x: 40,
            y: 82,
            parent: subProcess
        });

        create.start(event, [ subProcess, startEvent ], {
            hints: {
                autoSelect: [ subProcess ]
            }
        });
    }

    const actions = {};
    assign(actions, {
        'hand-tool': {
            group: 'tools',
            className: 'icon-custom hand-tool',
            title: '激活手动工具',
            action: {
                click: function(event) {
                    handTool.activateHand(event);
                }
            }
        },
        'lasso-tool': {
            group: 'tools',
            className: 'icon-custom lasso-tool',
            title: '激活套索工具',
            action: {
                click: function(event) {
                    lassoTool.activateSelection(event);
                }
            }
        },
        'space-tool': {
            group: 'tools',
            className: 'icon-custom space-tool',
            title: '激活创建/删除空间工具',
            action: {
                click: function(event) {
                    spaceTool.activateSelection(event);
                }
            }
        },
        'global-connect-tool': {
            group: 'tools',
            className: 'icon-custom connection-tool',
            title: '激活全局连接工具',
            action: {
                click: function(event) {
                    globalConnect.start(event);
                }
            }
        },
        'separator-tools': {
            group: 'tools',
            separator: true
        },
        'create.user-task': createAction('bpmn:UserTask', 'task',
            'icon-custom user-task', '分配给特定人的任务'),
        'create.service-task': createAction('bpmn:ServiceTask', 'task',
            'icon-custom service-task', '带有服务逻辑的自动任务'),
        'separator-task': {
            group: 'task',
            separator: true
        },
        'create.start-event': createAction('bpmn:StartEvent', 'event',
            'icon-custom start-event', '创建一个开始节点'),
        'create.end-event': createAction('bpmn:EndEvent', 'event',
            'icon-custom end-event', '创建一个结束节点'),
        'separator-event': {
            group: 'event',
            separator: true
        },
        'create.parallel-gateway': createAction('bpmn:ParallelGateway', 'gateway',
            'icon-custom parallel-gateway', '创建一个并行网关'),
        'create.exclusive-gateway': createAction('bpmn:ExclusiveGateway', 'gateway',
            'icon-custom exclusive-gateway', '创建一个排他网关'),
        'create.inclusive-gateway': createAction('bpmn:InclusiveGateway', 'gateway',
            'icon-custom inclusive-gateway', '创建一个包容网关'),
        'separator-gateway': {
            group: 'gateway',
                separator: true
        },
        'create.group': createAction(
            'bpmn:Group', 'artifact', 'icon-custom group',
            '创建组'
        ),
        'create.subprocess-expanded': {
            group: 'artifact',
            className: 'icon-custom subprocess',
            title: translate('创建扩展子流程'),
            action: {
                dragstart: createSubprocess,
                click: createSubprocess
            }
        }
    })
    return actions
}

PaletteProvider.$inject = [
    'bpmnFactory',
    'create',
    'elementFactory',
    'palette',
    'translate',
    'handTool',
    'lassoTool',
    'spaceTool',
    'globalConnect'
]
