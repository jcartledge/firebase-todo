import React from 'react';

export default function TodoForm ({add}) {
  let input;
  return (
    <form onSubmit={e => {
      e.preventDefault();
      add(input.value);
      input.value = '';
    }}>
    <input ref={node => input = node} />
    <input type="submit" value="Add" />
  </form>
  );
}
