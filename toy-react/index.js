import { ToyReact, Component } from "./ToyReact.js"
console.log("hellow")

class MyComponent extends Component {
    render() {
        return <div>
            <div>cool</div>  
            {this.children}  
            {undefined}
            {true}
            {1.123}        
        </div>
    }
}

let a = (<MyComponent name="a">    
<div>Hellow word!</div>
</MyComponent>)

ToyReact.render(
    a,
    document.body
)
