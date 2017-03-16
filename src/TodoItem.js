import React from 'react';

export default function TodoItem ({todo, remove}) {
  return (<li onClick={_ => remove(todo.key)}>{todo.text}</li>);
}
