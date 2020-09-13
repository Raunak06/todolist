import React, { Fragment } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TodoForm.css';

const TodoForm = (props) => {
  const {
    inputChangeHandler,
    currentValue: currentTask,
    addTaskHandler,
    selectedDate,
    dateChangeHandler,
    checkboxHandler,
    checkboxValue,
  } = props;
  return (
    <Fragment>
      <h3>Add Task</h3>
      <form id="todoForm" className="todo-form" onSubmit={addTaskHandler}>
        <input type='checkbox' onChange={checkboxHandler} value={checkboxValue} />
        <input
          type="text"
          placeholder="Enter task"
          value={currentTask}
          onChange={inputChangeHandler}
          className="task-input"
        />
        <DatePicker
          selected={selectedDate}
          onChange={dateChangeHandler}
          dateFormat="dd/MM/yyyy"
          className="date-picker"
        />
        <button type="submit">Add</button>
      </form>
    </Fragment>
  );
}

export default TodoForm;