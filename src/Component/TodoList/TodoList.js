import React from 'react';
import TodoTask from '../TodoTask/TodoTask';
import './TodoList.css';

const TodoList = (props) => {
  const {
    taskList,
    removeTaskHandler,
    priorityTaskHandler,
    searchTerm,
    checkboxHandler,
  } = props;
  return (
    <section>
      <h3>Todo Tasks</h3>
      <div>
        {taskList.map((task, index) => {
          if (task.task.indexOf(searchTerm) !== -1) {
            return (
              <TodoTask
                key={task.taskKey}
                taskItem={task}
                removeTaskHandler={removeTaskHandler}
                taskIndex={index}
                priorityTaskHandler={priorityTaskHandler}
                checkboxHandler={checkboxHandler}
              />
            );
          } else {
            return null;
          }
        })}
        {!taskList.length && (
          <div className="no-task">You have nothing to do. Enjoy!</div>
        )}
      </div>
    </section>
  );
}

export default TodoList;