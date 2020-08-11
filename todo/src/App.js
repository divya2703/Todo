import React from 'react';
import axios from 'axios';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      value: '',
      todos: []
    };
    this.deleteTodo = this.deleteTodo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateTodoList = this.updateTodoList.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }
  componentDidMount() {
    axios.get("http://localhost:9000/v1/todos")
      .then(doc =>{
        //console.log(doc.data)
        this.setState({
          isLoaded: true,
          todos: doc.data
        });
      })
      .catch((error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  keyPress(e){
    if(e.keyCode === 13){
      this.addTodo(e);
    }
 }

  updateTodoList(){
    axios.get("http://localhost:9000/v1/todos")
    .then(doc =>{
      this.setState({
        isLoaded: true,
        todos: doc.data
      });
    })
    .catch((error) => {
        this.setState({
          isLoaded: true,
          error
        });
    })
  }

  addTodo(e){
    axios.post("http://localhost:9000/v1/todo",
    {
        name: this.state.value
    })
    .then(() => {
     this.updateTodoList()
     this.setState({'value':''})
    })
    .catch(er =>{
      console.log(er)
    })
    e.preventDefault();
  }

  editTodo(id,e){
    e.preventDefault();

  }

  deleteTodo(id, e){
    e.preventDefault();
    axios.delete(`http://localhost:9000/v1/todo/${id}`)
    .then((doc)=>{
     console.log({"Deleted":doc})
    })
    .then(() =>{
      this.updateTodoList()
    })
    .catch((error)=>{
      console.log(error);
    })

  }
 
  render()
  {      
    return (
      <div className="App">

        <header className="App-header">
          <h1> Your Todos</h1>
        </header>

        <div className="input-group">
          <input type="text" className="form-control" placeholder="Add Todo" value={this.state.value}  onChange={this.handleChange} onKeyDown={this.keyPress} aria-label="Recipient's username with two button addons" aria-describedby="button-addon4"></input>
          <button className="btn btn-success" type="button"  onClick= {(e) => this.addTodo(e)} id="2">Add</button>  
        </div> 

        <div className="jumbotron"> 
        {/* "d-inline p-2 m-1 bg-primary text-white" */}
          {this.state.todos.map((todo) => (
            <button className="btn-group" type="button" onDoubleClick = {(e) => this.deleteTodo(todo._id, e)}  >{todo.name}</button>
        ))}
       
        </div>
      </div>
    );
  }
 
}

export default App;


