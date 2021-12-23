import { assign } from 'min-dash';
export default function ContextPadProvider(contextPad, config, injector, translate, bpmnFactory, elementFactory, create, modeling, connect) {
    this.create = create
    this.elementFactory = elementFactory
    this.translate = translate
    this.bpmnFactory = bpmnFactory
    this.modeling = modeling
    this.connect = connect
    config = config || {}
    if (config.autoPlace !== false) {
        this.autoPlace = injector.get('autoPlace', false);
    }
    contextPad.registerProvider(this)
}

ContextPadProvider.$inject = [
    'contextPad',
    'config',
    'injector',
    'translate',
    'bpmnFactory',
    'elementFactory',
    'create',
    'modeling',
    'connect'
]

ContextPadProvider.prototype.getContextPadEntries = function(element) {
    const {
        autoPlace,
        create,
        elementFactory,
        translate,
        modeling
    } = this;

    const actions = {};

    assign(actions, {
        'append.user-task': createAction(
            'bpmn:UserTask', 'task', 'icon-custom user-task',
            translate('创建一个用户任务')
        )
    }, {
        'append.end-event': createAction(
            'bpmn:EndEvent', 'event', 'icon-custom end-event',
            translate('创建一个结束节点')
        )
    }, {
        'append.parallel-gateway': createAction(
            'bpmn:ParallelGateway', 'gateway', 'icon-custom parallel-gateway',
            translate('创建一个并行网关')
        )
    }, {
        'append.exclusive-gateway': createAction(
            'bpmn:ExclusiveGateway', 'gateway', 'icon-custom exclusive-gateway',
            translate('创建一个排他网关')
        )
    }, {
        'delete': deleteElement()
    })

    // 删除功能
    function deleteElement() {
        return {
            group: 'edit',
            className: 'icon-custom delete',
            title: translate('删除'),
            action: {
                click: removeElement
            }
        }
    }

    function removeElement() {
        modeling.removeElements([element])
    }
    function createAction(type, group, className, title, options) {
        function click(event, element) {
            if (autoPlace) {
                const shape = elementFactory.createShape(assign({ type: type }, options));
                autoPlace.append(element, shape);
            } else {
                dragstart(event, element);
            }
        }

        function dragstart(event) {
            const shape = elementFactory.createShape(assign({ type: type }, options));
            create.start(event, shape, element);
        }

        return {
            group: group,
            className: className,
            title: title,
            action: { dragstart, click }
        };
    }

    return actions
}
