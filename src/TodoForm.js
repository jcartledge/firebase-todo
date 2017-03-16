import React from 'react';

const TodoForm = ({add}) => {
  let input;
  return (
    <div>
      <input ref={node => input = node} />
      <button onClick={_ => {
        add(input.value);
        input.value = '';
      }}>Add</button>
    </div>
  );
}

export default TodoForm;
