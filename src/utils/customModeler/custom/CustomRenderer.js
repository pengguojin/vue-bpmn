import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

import {append as svgAppend, create as svgCreate} from 'tiny-svg';
import {customConfig, customElements, hasLabelElements} from '@/utils/util'

const HIGH_PRIORITY = 1500

export default class CustomRenderer extends BaseRenderer {
    constructor(eventBus, bpmnRenderer, modeling) {
        super(eventBus, HIGH_PRIORITY);

        this.bpmnRenderer = bpmnRenderer;
        this.modeling = modeling;
    }

    canRender(element) {
        // ignore labels
        return !element.labelTarget;
    }

    drawShape(parentNode, element) {
        const type = element.type // 获取到类型
        if (customElements.includes(type)) {
            const { url, attr } = customConfig[type]
            const customIcon = svgCreate('image', {
                ...attr,
                href: url
            })
            element['width'] = attr.width
            element['height'] = attr.height
            svgAppend(parentNode, customIcon)
            // 判断是否有name属性来决定是否要渲染出label
            if (!hasLabelElements.includes(type) && element.businessObject.name) {
                const text = svgCreate('text', {
                    x: attr.x,
                    y: attr.y + attr.height + 20,
                    "font-size": "14",
                    "fill": "#8c8484"
                })
                text.innerHTML = element.businessObject.name
                svgAppend(parentNode, text)
            }
            return customIcon
        }
        return this.bpmnRenderer.drawShape(parentNode, element)
    }

    getShapePath(shape) {
        return this.bpmnRenderer.getShapePath(shape);
    }

    // /**
    //  * 添加节点的字
    //  * @param gGroupNode
    //  * @param element
    //  */
    // addTextNode(gGroupNode,element){
    //     let tspan = SVGUtil.create("tspan");
    //     SVGUtil.setAttrs(tspan, {
    //         "x": "28",
    //         'y':'43',
    //     });
    //     tspan.innerHTML=(element.businessObject&&element.businessObject.name)||"会签节点";
    //     let textNode = SVGUtil.create("text");
    //     SVGUtil.setAttrs(textNode, {
    //         "class": "djs-label",
    //         'font-size':'12px',
    //         'font-weight':'normal',
    //         'fill':'black',
    //         "font-family": "Arial, sans-serif",
    //     });
    //     textNode.appendChild(tspan);
    //     gGroupNode.appendChild(textNode);
    //     element.textNode=textNode;
    // }
}

CustomRenderer.$inject = ['eventBus', 'bpmnRenderer', 'modeling'];
