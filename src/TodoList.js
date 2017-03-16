import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList ({todos, remove}) {
  return (
    <ul>
      {todos.map(todo => <TodoItem todo={todo} key={todo.key} remove={remove} />)}
    </ul>
  )
}
