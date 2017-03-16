import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({todos, remove}) => {
  return (
    <ul>
      {todos.map(todo => <TodoItem todo={todo} key={todo.id} remove={remove} />)}
    </ul>
  )
}

export default TodoList;
