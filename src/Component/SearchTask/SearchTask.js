import React, { Fragment } from 'react';
import './SearchTask.css';

const SearchTask = (props) => {
  const {
    searchTerm,
    inputChangeHandler,
    searchHandler,
  } = props;
  
  return (
    <Fragment>
      <h3>Search Task</h3>
      <form id="searchForm" className="search-form" onSubmit={searchHandler}>
        <input
          type="text"
          placeholder="Search task"
          value={searchTerm}
          onChange={inputChangeHandler}
        />
      </form>
    </Fragment>
  );
}

export default SearchTask;
