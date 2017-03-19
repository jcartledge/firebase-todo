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

  handleRemoveTodo = (key) => this.db.ref(key).remove();

  todoAdded = (data) => {
    const todo = {text: data.val(), key: data.key};
    this.setState({todos: [...this.state.todos, todo]});
  }

  todoRemoved = (data) => {
    this.setState({todos: this.state.todos.filter(todo => todo.key !== data.key)});
  }

  authStateChanged = (user) => {
    this.setState({user});
  }

  constructor (props) {
    super(props);
    this.state = {
      todos: [],
      user: {}
    };
  }

  componentWillMount () {
    firebase.initializeApp(config);
    this.db = firebase.database();
    this.todos = this.db.ref();
    this.todos.on('child_added', this.todoAdded);
    this.todos.on('child_removed', this.todoRemoved);
  }

  componentWillUnmount () {
    this.db.off();
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
