
class BaseNode {    
    renderToDom(dom) {

    }
}

class VirtualElement extends BaseNode {
    constructor() {
        super()
        this.children = []
    }

    appendChild(child) {
        this.children.push(child)
    }

    setAttribute(name, value) {
        
    }
}


class TextNodeWraper extends BaseNode {
    constructor(content) {
        super()
        this.root = document.createTextNode(content)
    }    
    renderToDom(dom) {
        dom.appendChild(this.root)
    }
}

class ElementWraper extends VirtualElement {
    constructor(tag) {
        super()
        this.root = document.createElement(tag)
    }    

    setAttribute(name, value) {
        
        if (name.match(/^on([\S\s]+)$/)) {
            let eventName = RegExp.$1.replace(/^[\S\s]/, s => s.toLocaleLowerCase())
            this.root.addEventListener(eventName, value)
        } 
        if (name == 'className') {
            this.root.setAttribute('class', value)
        } else {
            this.root.setAttribute(name, value)            
        }                
    }

    renderToDom(dom) {        
        dom.appendChild(this.root)
        
        for (const child of this.children) {     
            child.renderToDom(this.root)                             
        }
    }
}

export class Component extends VirtualElement {    
    constructor() {   
        super()     
        this.props = Object.create(null)
    }

    setAttribute(name, value) {
        this.props[name] = value
    }

    renderToDom(dom) {
        this.render().renderToDom(dom)                
    }

    render() {
        return null
    }
}


const DemoReact = {
    createElement(tag, attributes, ...children) {
        let element
        if (typeof tag === 'string') {
            element = new ElementWraper(tag)
        } else {
            element = new tag()
        }

        for (const name in attributes) {
            if (attributes.hasOwnProperty(name)) {                
                element.setAttribute(name, attributes[name])                
            }
        }
        


        function appendChildren(children) {
            for (const child of children) {
                if (child === null) {
                    continue
                }
    
                if (typeof child === 'object' && child instanceof Array) {
                    appendChildren(child)
                } else {
                    if (!(child instanceof BaseNode)) {
                        child = String(child)
                    }

                    if (typeof child === 'string') {
                        child = new TextNodeWraper(child)
                    }
                    element.appendChild(child)                
                }                         
            }
        }      

        appendChildren(children)
        return element
    },
    render(component, dom) {
        component.renderToDom(dom)                
    }   
}

export default DemoReact