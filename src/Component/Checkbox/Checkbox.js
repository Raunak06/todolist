import React from 'react';

const Checkbox = (props) => {
  const {
    checkboxHandler,
    taskCompleted,
    value,
  } = props;
  return (
    <input
      type='checkbox'
      onChange={checkboxHandler}
      checked={taskCompleted}
      value={value}
    />
  );
};

export default Checkbox;