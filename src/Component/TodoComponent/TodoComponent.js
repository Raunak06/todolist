import React, { useState, useEffect } from 'react';
import TodoForm from '../TodoForm/TodoForm';
import TodoList from '../TodoList/TodoList';
import SearchTask from '../SearchTask/SearchTask';

const Todo = () => {
  const [currentTask, setCurrentTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (localStorage.getItem('taskList')) {
      setTaskList(JSON.parse(localStorage.getItem('taskList')));
    }
  }, []);

  const todoInputChangeHandler = (e) => {
    setCurrentTask(e.target.value);
  };

  const addTaskHandler = (e) => {
    e.preventDefault();
    if (currentTask) {
      let taskList;
      const dueDate = new Date(selectedDate);
      const task = {
        'task': currentTask,
        'dueDate': dueDate.getTime(),
        'color': '',
        'priority': false,
        'taskKey': Date.now(), 
        'isCompleted': false,
      };
      if (localStorage.getItem('taskList')) {
        taskList = JSON.parse(localStorage.getItem('taskList'));
        taskList.push(task);
      } else {
        taskList = [task];
      }
      setCurrentTask('');
      setSelectedDate(new Date());

      updateLocalStorageAndState(taskList);
    } else {
      console.log('Add task');
    }
  };

  const updateLocalStorageAndState = (localTaskList) => {
    localStorage.setItem('taskList', JSON.stringify(localTaskList));
    setTaskList(localTaskList);
  };

  const removeTaskHandler = (taskIndex) => {
    const taskList = JSON.parse(localStorage.getItem('taskList'));
    taskList.splice(taskIndex, 1);
    updateLocalStorageAndState(taskList);
  };

  const priorityTaskHandler = (taskItem, taskIndex) => {
    const taskList = JSON.parse(localStorage.getItem('taskList'));
    if (!taskItem.priority) {
      taskList[taskIndex].priority = true;
      const priorityTask = taskList.splice(taskIndex, 1)[0];
      taskList.splice(0, 0, priorityTask);
    } else {
      const newIndex = (taskList.findIndex(task => !task.priority)-1);
      taskList[taskIndex].priority = false;
      const lowPriorityTask = taskList.splice(taskIndex, 1)[0];
      taskList.splice(newIndex, 0, lowPriorityTask);
    }
    updateLocalStorageAndState(taskList);
  }

  const dateChangeHandler = date => setSelectedDate(date);

  const searchTermChangeHandler = e => setSearchTerm(e.target.value);

  const completeTaskToggler = (e) => {
    const taskList = JSON.parse(localStorage.getItem('taskList'));
    taskList.forEach(task => {
      if (task.taskKey.toString() === e.target.value) {
        task.isCompleted = e.target.checked;
      }
    });
    updateLocalStorageAndState(taskList);
  };

  const allCompleteTaskToggler = (e) => {
    const taskList = JSON.parse(localStorage.getItem('taskList'));
    taskList.forEach(task => task.isCompleted = e.target.checked);
    updateLocalStorageAndState(taskList);
  }

  return (
    <div>
      <TodoForm
        currentValue={currentTask}
        inputChangeHandler={todoInputChangeHandler}
        addTaskHandler={addTaskHandler}
        selectedDate={selectedDate}
        dateChangeHandler={dateChangeHandler}
        checkboxHandler={allCompleteTaskToggler}
        checkboxValue='Select All'
      />
      <SearchTask
        searchTerm={searchTerm}
        inputChangeHandler={searchTermChangeHandler}
        searchHandler={(e) => e.preventDefault()}
      />
      <TodoList
        taskList={taskList}
        removeTaskHandler={removeTaskHandler}
        priorityTaskHandler={priorityTaskHandler}
        searchTerm={searchTerm}
        checkboxHandler={completeTaskToggler}
      />
    </div>
  );
}

export default Todo;