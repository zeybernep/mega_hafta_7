import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

const App = () => {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);


  const [taskChangeCount, setTaskChangeCount] = useState(0);

  useEffect(() => {
    if (taskChangeCount > 0)
       {
             localStorage.setItem(' tasks', JSON.stringify(tasks))
    
       }
  }, [taskChangeCount])


  useEffect(() => { 
    const localStorageTasks = JSON.parse(localStorage.getItem(' tasks'))
    setTasks(localStorageTasks?? []);

  },[])













 

  useEffect(() => {
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    setTaskChangeCount(prev=>prev+1)
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const completeTask = (index) => {
    setTaskChangeCount(prev=>prev+1)
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setTaskChangeCount(prev=>prev+1)
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>
        To-Do List{' '}
        <span role="img" aria-label="pencil">
          ✏️
        </span>
      </h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>
        görev ekleyin <FontAwesomeIcon icon={faCheck} />
      </button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.text}
            </span>
            <button onClick={() => completeTask(index)}>
              {task.completed ? (
                <FontAwesomeIcon icon={faUndo} />
              ) : (
                'Tamamla'
              )}
            </button>
            <button onClick={() => deleteTask(index)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default App;