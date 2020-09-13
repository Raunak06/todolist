import React from 'react';
import Checkbox from '../Checkbox/Checkbox';
import './TodoTask.css';

const TodoTask = (props) => {
  const {
    taskItem,
    removeTaskHandler,
    taskIndex,
    priorityTaskHandler,
    checkboxHandler,
  } = props;

  const dueDateTimeStamp = taskItem.dueDate;
  const dueDate = (new Date(dueDateTimeStamp)).toLocaleDateString();
  const todayTimeStamp = Date.now();
  const dueInDays = Math.round((dueDateTimeStamp - todayTimeStamp) / (1000 * 3600 * 24));
  let colourScheme = '';
  if (dueInDays === 2) colourScheme = 'yellow';
  else if (dueInDays === 1) colourScheme = 'orange';
  else if (dueInDays === 0) colourScheme = 'red';
  else if (dueInDays < 0) colourScheme = 'dark-red';

  const isCompleted = taskItem.isCompleted ? 'task-completed' : '';

  return (
    <div className="task">
      <Checkbox
        checkboxHandler={checkboxHandler}
        taskCompleted={taskItem.isCompleted}
        value={taskItem.taskKey}
      />
      <div
        className={`task-name ${isCompleted}`}
      >{taskItem.task}</div>
      <div
        className={`due-date ${colourScheme}`}
      >{dueDate}</div>
      <div className="task-buttons">
        <button
          onClick={() => removeTaskHandler(taskIndex)}
        >
          Delete
        </button>
        <button
          className={taskItem.priority ? 'priority-task' : ''}
          onClick={() => priorityTaskHandler(taskItem, taskIndex)}
        >
          Prioritize
        </button>
      </div>
    </div>
  );
}

export default TodoTask;