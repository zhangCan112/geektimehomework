const RENDER_TO_DOM = Symbol("render to dom")

class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type)        
    }
    setAttribute(name, value) {
        if (name.match(/^on([\s\S]+)$/)) {
            console.log(RegExp.$1)
            let eventName = RegExp.$1.replace(/^[\s\S]/, s => s.toLowerCase())
            this.root.addEventListener(eventName, value)
        }
        this.root.setAttribute(name, value)
    }

    appendChild(component) {
       this.root.appendChild(component.root)
    }    
}

class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content)        
    }
}

export class Component {

    constructor() {
        this.children = []
        this.props = Object.create(null)
        this._root = null
        this.state = null
    }

    setAttribute(name, value) {
        if (name.match(/^on([\s\S]+)$/)) {
            console.log(RegExp.$1)
        }
        this.props[name] = value
        this[name] = value
    }

    appendChild(component) {
        this.children.push(component)
    }

    get root() {
        if (!this._root) {
            this._root = this.render().root
        } 
        return this._root
    }

    [RENDER_TO_DOM](range) {
        this.render()[RENDER_TO_DOM](range)
    }

    setState(state) {

    }
}

export let ToyReact = {
    createElement(type, attributes, ...children) {
        
        let element
        if (typeof type === 'string') {
            element = new ElementWrapper(type)                           
        } else {
            element = new type
        }
                
        for (const name in attributes) {
            element.setAttribute(name, attributes[name])
        }

       let insertChildren = (children) => {
            for (const child of children) {
                
                if (typeof child === 'object' && child instanceof Array) {
                    insertChildren(child)
                } else {

                    if (!(child instanceof Component) 
                    && !(child instanceof ElementWrapper)
                    && !(child instanceof TextWrapper)) {
                        child = String(child)
                    }
                    if (typeof child === 'string') {
                        child = new TextWrapper(child)
                    }
                    element.appendChild(child)                    
                }                
            }
        }       

        insertChildren(children)
        return element
    },
    render(component, root) {
        root.appendChild(component.root)
    }
}