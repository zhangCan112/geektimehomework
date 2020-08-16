import { ToyReact, Component } from "./ToyReact.js"

class Square extends Component {
    render() {
        return (
            <button className="square" onClick={() => props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}

class Board extends Component {
    renderSquare(i) {        
        return <Square value={i} />;
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}



// let a = <Board></Board>


class MyComponent extends Component {
    
    constructor() {
        super()
        this.state = {a:1, b:2}
    }

    render() {
        return <div onClick ={()=> {this.setState({a: this.state.a + 1})}}>
            {this.children}
            <div>{this.state.a}</div>
            <div>{this.state.b}</div>            
        </div>
    }
}




ToyReact.render(
    <MyComponent>MyComponent</MyComponent>,
    document.body
)
