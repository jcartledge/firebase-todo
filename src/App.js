import firebase from 'firebase';
import config from "./config";

import React, { Component } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

export default class App extends Component {
  handleAddTodo = (text) => this.todos.push(text);

  handleRemoveTodo = (key) => this.db.ref(key).remove();

  todoAdded = (data) => {
    const todo = {text: data.val(), key: data.key};
    this.setState({todos: [...this.state.todos, todo]});
  }

  todoRemoved = (data) => {
    this.setState({todos: this.state.todos.filter(todo => todo.key !== data.key)});
  }

  constructor (props) {
    super(props);
    this.state = {todos: []};
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
      <div className="App">
        <TodoForm add={this.handleAddTodo} />
        <TodoList todos={this.state.todos} remove={this.handleRemoveTodo} />
      </div>
    );
  }
}
