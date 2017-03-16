import React, { Component } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

import config from "./config";

let id = 0;

export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {todos: []};
  }

  addTodo = (text) => {
    const todos = [...this.state.todos, {text, id: id++}];
    this.setState({todos});
  };

  removeTodo = (id) => {
    this.setState({todos: this.state.todos.filter(todo => todo.id !== id)});
  }

  render() {
    return (
      <div className="App">
        <TodoForm add={this.addTodo} />
        <TodoList todos={this.state.todos} remove={this.removeTodo} />
      </div>
    );
  }
}
