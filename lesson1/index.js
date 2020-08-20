import DemoReact from './DemoReact';
import { Component } from './DemoReact';

class MyComponents extends Component {
    

    render() {
        return (
            <div a={'hellow'}>                
                1212
                <div onClick={()=>{alert(1)}}>121212</div>
                <div>hahah</div>
        <div>{123}</div>
        <div>{undefined}</div>
                {this.children}
            </div>
        )
    }
}

let a = <MyComponents>
    <MyComponents>
    
    </MyComponents>
</MyComponents>


class Square extends Component {
    render() {
      return (
        <button className="square">
          {this.props.value}
        </button>
      );
    }
  }
  
  class Board extends Component {
    renderSquare(i) {
      return <Square value={i} onClick={() => {alert(this.props.value)}}/>;
    }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status" >{status}</div>
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
  
  class Game extends Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  

DemoReact.render(<Game></Game>, document.body)