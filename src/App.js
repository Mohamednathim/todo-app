import React, { useState, useEffect } from 'react'
import './App.css';
import { AiOutlineDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

function App() {
  const [allTodos, setAllTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState(allTodos);
  const [filter, setFilter] = useState("All")

  const [newTodo, setNewTodo] = useState({ taskName: '', description: '', status: 'Not Completed' });

  const handleAddTodo = () => {

    const newTodoWithId = { ...newTodo, id: Date.now() };
    setAllTodos((prevTodos) => [...prevTodos, newTodoWithId]);
    setFilteredTodos((prevFilteredTodos) => [...prevFilteredTodos, newTodoWithId]);
    setNewTodo({ taskName: '', description: '', status: 'Not Completed' });
  };

  const handleDeleteTodo = (id) => {
    setAllTodos(allTodos.filter((todo) => todo.id !== id));
    setFilteredTodos(filteredTodos.filter((todo) => todo.id !== id));
  }

  const updateTodo = (id, updateTodo) => {
    setAllTodos(allTodos.map((todo) => (todo.id === id ? updateTodo : todo)))
    setFilteredTodos(filteredTodos.map((todo) => (todo.id === id ? updateTodo : todo)));
  }

  const todoStatus = (id, stats) => {
    const updatedTodos = allTodos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          status: stats
        };
      } else {
        return todo;
      }
    });
    setFilter("All")
    setAllTodos(updatedTodos);
    setFilteredTodos(updatedTodos);
  };

  const filterTodos = (filtervalue) => {
    setFilter(filtervalue)
    switch (filtervalue) {
      case 'Completed':
        setFilteredTodos(allTodos.filter((todo) => todo.status === 'Completed'));
        break;
      case 'Not Completed':
        setFilteredTodos(allTodos.filter((todo) => todo.status === 'Not Completed'));
        break;
      default:
        setFilteredTodos(allTodos);
    }
  };

  return (
    <div className="App">
      <h1>My ToDo</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Task Name</label>
            <input type='text' value={newTodo.taskName} onChange={(e) => setNewTodo({ ...newTodo, taskName: e.target.value })} placeholder='Task Name' />
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type='text' value={newTodo.description} onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })} placeholder='Description' />
          </div>
          <div className='todo-input-item'>
            <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
          </div>
        </div>

        <div className='filter-area'>
          <div className='filter-div'>My Todos...</div>
          <label>Status Filter : </label>
          <select value={filter} onChange={(e) => filterTodos(e.target.value)}>
            <option value='All'>All</option>
            <option value='Completed'>Completed</option>
            <option value='Not Completed'>Not Completed</option>
          </select>
        </div>

        <div className='todo-list'>
          {filteredTodos.map((item) => {
            return (
              <div className='todo-list-item' key={item.id}>
                <h3>Task Name : {item.taskName}</h3>
                <p>Description : {item.description}</p>
                <div>
                  <label>Status : </label>
                  <select value={item.status} onChange={(e) => todoStatus(item.id, e.target.value)} className={item.status == "Completed" ? 'completed' : "notCompleted"}>
                    <option value='Not Completed'>Not Completed</option>
                    <option value='Completed'>Completed</option>
                  </select>
                </div>
                <div className='icon'>
                  <FaEdit className='edit-icon' onClick={() => {
                    const updateTaskName = prompt('Enter updated task name:', item.taskName)
                    const updateDescription = prompt('Enter updated description:', item.description)
                    const updateStatus = prompt('Enter updated status:', item.status)
                    updateTodo(item.id, { taskName: updateTaskName, description: updateDescription, status: updateStatus })
                  }} title='Edit?' />
                  <AiOutlineDelete className='delete-icon' onClick={() => handleDeleteTodo(item.id)} title='Delete?' />
                </div>

              </div>
            )
          })}

        </div>
      </div>
    </div >
  );
}

export default App;
