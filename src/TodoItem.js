import React from 'react';

const TodoItem = ({todo, remove}) => {
  return (<li onClick={_ => remove(todo.id)}>{todo.text}</li>);
}

export default TodoItem;
