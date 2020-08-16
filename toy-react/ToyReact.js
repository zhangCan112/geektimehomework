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

        if (name === "className") {
            this.root.setAttribute("class", value)
        } else {
            this.root.setAttribute(name, value)            
        }        
    }

    appendChild(component) {
        let range = document.createRange()
        range.setStart(this.root,0)
        range.setEnd(this.root,this.root.childNodes.length)        
        component[RENDER_TO_DOM](range)       
    }    

    [RENDER_TO_DOM](range) {
        range.deleteContents()
        range.insertNode(this.root)
    }
}

class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content)        
    }
    [RENDER_TO_DOM](range) {
        range.deleteContents()
        range.insertNode(this.root)
    }
}

export class Component {

    constructor() {
        this.children = []
        this.props = Object.create(null)
        this._root = null
        this.state = null
        this._range = null
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

    [RENDER_TO_DOM](range) {
        this._range = range;
        this.render()[RENDER_TO_DOM](range)
    }

    rerender() {
        let oldRange = this._range;
        
        let range = document.createRange();
        range.setStart(this._range.startContainer, this._range.startOffset)
        range.setEnd(this._range.startContainer, this._range.startOffset)
        this[RENDER_TO_DOM](range)

        oldRange.setStart(range.endContainer, range.endOffset)
        this.range.deleteContents();        
    }

    setState(newState) {
        if (this.state === null || typeof this.state !== "object") {
            this.state = newState
            this.rerender()
            return
        }
        let merge = function (oldState, newState) {
            for (const p in newState) {
                if (newState.hasOwnProperty(p)) {
                    if (oldState[p] === null || typeof oldState !== "object") {
                        oldState[p] = newState[p]
                    } else {
                        merge(oldState[p], newState[p])
                    }                    
                }
            }
        } 
        merge(this.state, newState)
        this.rerender()
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
    render(component, parentElement) {
        let range = document.createRange()
        range.setStart(parentElement,0)
        range.setEnd(parentElement,parentElement.childNodes.length)        
        component[RENDER_TO_DOM](range)
    }
}