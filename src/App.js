import firebase from 'firebase';
import config from "./config";

import React from 'react';

import FacebookLogin from './FacebookLogin';
import GoogleLogin from './GoogleLogin';
import LogoutButton from './LogoutButton';

import TodoForm from './TodoForm';
import TodoList from './TodoList';

export default class App extends React.Component {
  handleAddTodo = (text) => this.todos.push(text);

  handleRemoveTodo = (key) => this.db.ref(`${this.userDBRef()}/${key}`).remove();

  todoAdded = (data) => {
    const todo = {text: data.val(), key: data.key};
    this.setState({todos: [...this.state.todos, todo]});
  }

  todoRemoved = (data) => {
    this.setState({todos: this.state.todos.filter(todo => todo.key !== data.key)});
  }

  authStateChanged = (user) => {
    this.setState({user}, _ => {
      if (this.state.user) {
        this.todos = this.db.ref(this.userDBRef());
        this.todos.on('child_added', this.todoAdded);
        this.todos.on('child_removed', this.todoRemoved);
      } else {
        this.todos.off();
        delete this.todos;
        this.setState({todos: []});
      }
    });
  }
  userDBRef = () => `/users/${this.state.user.user.uid}/todos`;

  constructor (props) {
    super(props);
    this.state = {
      todos: [],
      user: undefined
    };
  }

  componentWillMount () {
    firebase.initializeApp(config);
    this.db = firebase.database();
  }

  componentWillUnmount () {
    if (this.todos) {
      this.todos.off();
    }
  }

  render() {
    return (
      <div className="App"> {
        (this.state.user)
        ? <div>
            <LogoutButton firebase={firebase} changed={this.authStateChanged} />
            <TodoForm add={this.handleAddTodo} />
            <TodoList todos={this.state.todos} remove={this.handleRemoveTodo} />
          </div>
          : <div>
            <FacebookLogin firebase={firebase} changed={this.authStateChanged} />
            <GoogleLogin firebase={firebase} changed={this.authStateChanged} />
          </div>
      } </div>
    );
  }
}
