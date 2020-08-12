import React from 'react';

class App2 extends React.Component {
    constructor(){
    super();
    this.state={
      todo:[],
      editing:false,
      value: ''
    };
  };

  entertodo(keypress){
    var Todo=this.refs.inputodo.value;
    if( keypress.charCode == 13 )

    {
      this.setState({
        todo: this.state.todo.concat({Value:Todo, checked:false})
      });
      this.refs.inputodo.value=null;
    };
  };
   todo(todo,i){
    return (
      <li className={todo.checked===true? 'line':'newtodo'}>
        <div onClick={this.todoCompleted.bind(this, i)}>
          <input type="checkbox" className="option-input checkbox" checked={todo.checked} />
          <div key={todo.id}  className="item">
            {todo.Value}
            <button onClick={this.edit.bind(this,i)} className="editmode">edit</button>
            <span className="destroy" onClick={this.remove.bind(this, i)}>X</span>
          </div>
        </div>
      </li>
    );
  };

  remove(i){
    this.state.todo.splice(i,1)
    this.setState({todo:this.state.todo})
  };
  todoCompleted(i){
     var todo=this.state.todo;
     todo[i].checked =todo[i].checked? false:true;
       this.setState({
         todo:this.state.todo
       });
   };
  allCompleted=()=>{
    var todo = this.state.todo;
    var _this = this
    todo.forEach(function(item) {
      item.className = _this.state.finished ? "newtodo" : "line"
      item.checked = !_this.state.finished
    })
    this.setState({todo: todo, finished: !this.state.finished})
  };
  changeValue(e) {
    this.setState({
    value: this.state.value = e.target.value
  });
}
  edit(i){
    var todo= this.state.todo
    this.setState({
      editing:true,
      value: this.state.todo[i].Value
    });
  };
  save(i){
    var Todo=this.refs.edittodo.value
    var todo=this.state.todo[i]
    this.setState({
      editing:false,
      todo:this.state.todo.concat({Value:todo})

    });
  };
    rendernormal() {
    return (
        <div>
          <h1 id='heading'>todos</h1>
          <div className="lines"></div>
          <div>
            <input type="text" ref= "inputodo" onKeyPress={this.entertodo.bind(this)}className="inputodo"placeholder='todos'/>
            <span onClick={this.allCompleted}id="all">^</span>
          </div>
          <div className="mainapp">
            <ul className="decor">
              {this.state.todo.map(this.todo.bind(this))}
            </ul>
          </div>
        </div>
      );
    };
    renderform(todo,i) {
    return (
      <div>
        <h1 id='heading'>todos</h1>
        <div className="lines"></div>
        <div>
          <input type="text" ref= "edittodo" value={this.state.value} onChange={this.changeValue.bind(this)} className="editodo"placeholder='EDIT TODO'/>
          <span onClick={this.allCompleted}id="all">^</span>
          <button onClick={this.save.bind(this,i)}>save</button>
        </div>
        <div className="mainapp">
          <ul className="decor">
            {this.state.todo.map(this.todo.bind(this))}
          </ul>
        </div>
      </div>
      );
    };
    render(){
      if (this.state.editing) {
        return this.renderform()
      }
      else {
      return this.rendernormal()
      }
    };
  }

      

export default App2;