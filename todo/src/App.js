import React from 'react';
import axios from 'axios';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      curId: null,
      value: '',
      todos: []
    };

   
    this.keyPress = this.keyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateTodoList = this.updateTodoList.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.saveTodo = this.saveTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);

  }

  componentDidMount() {
    axios.get("http://localhost:9000/v1/todos")
      .then(doc =>{
        this.setState({
          isLoaded: true,
          curId: null,
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
    this.setState({value: event.target.value, isEdit:true});
  }

  keyPress(e){
    if(e.keyCode === 13 ){
      this.addTodo(e);
    }
  }

  updateTodoList(){
    axios.get("http://localhost:9000/v1/todos")
    .then(doc =>{
      this.setState({
        isLoaded: true,
        curId: null,
        value: '',
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

  addTodo(event){
   if(this.state.curId){
     this.saveTodo(this.state.curId);
     this.setState({'value': '', isEdit: false})

   }
   else{
    axios.post("http://localhost:9000/v1/todo",
    {
      name: this.state.value
    })
    .then(() => {
      this.updateTodoList()
      this.setState({'value': '', isEdit: false})
    })
    .catch(er =>{
      if(er.statusText === "404")
        alert("todo already exists");
      else
        alert("Something wrong");
      this.setState({'value': ''})
    })
   }  
   event.preventDefault();
  }

  editTodo(todo, event){

    this.setState({'value': todo.name, 'isEdit': true, 'curId':todo._id})
    event.preventDefault();

  }

  saveTodo(id){
      axios.put(`http://localhost:9000/v1/todo/${id}`,
      {
          name: this.state.value
      })
      .then((doc) => {
        console.log({"updated": doc})
        this.updateTodoList()
        this.setState({'value': '', isEdit: false})
      })
      .catch(er =>{
        alert("todo already exists");
        this.setState({'value':''})
      })
    
  }

  deleteTodo(id, e){
    e.preventDefault();
    axios.delete(`http://localhost:9000/v1/todo/${id}`)
    .then((doc)=>{
     console.log({"Deleted":doc})
    })
    .then(() =>{
      this.updateTodoList()
      this.setState({'value':''})
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

          <input type="text" className="form-control" placeholder="Add Todo" value={this.state.value}  onChange={this.handleChange} onKeyDown={(e) => this.keyPress(e)} aria-label="Recipient's username with two button addons" aria-describedby="button-addon4" autoFocus={true}></input>

          <button className="btn btn-success" type="button"  onClick= {(e) => this.addTodo(e)} >Add</button>  

        </div> 

        <div className="jumbotron"> 
          {
            this.state.todos.map((todo) => (
            <button key = {todo._id} className="btn-group" type="button" onClick = {(e) => this.editTodo(todo, e)}  onDoubleClick = {(e) => this.deleteTodo(todo._id, e)}  >{todo.name}</button>
            ))
          }
       
        </div>
      </div>
    );
  }
 
}

export default App;


