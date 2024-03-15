import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function App() {

  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState(() => {
    const tasksStorage = localStorage.getItem('@task');
    return tasksStorage ? JSON.parse(tasksStorage) : [];
  });
  const [taskStatus, setTaskStatus] = useState(() => {
    const taskStatusStorage = localStorage.getItem('@taskStatus');
    return taskStatusStorage ? JSON.parse(taskStatusStorage) : {};
  });

  useEffect(() => {
    
    localStorage.setItem('@task', JSON.stringify(tasks));
    localStorage.setItem('@taskStatus', JSON.stringify(taskStatus));
  }, [tasks, taskStatus]);

  function handleRegister(e) {
    e.preventDefault();

    if(input.trim() === '') {
      Swal.fire({
        title: 'You must type some task',
        icon: 'error',
        confirmButtonText:'Ok',
        confirmButtonColor: 'black'
      })
      return;
    }

    setTasks([...tasks, input.trim()]);
    setTaskStatus({...taskStatus, [input.trim()]: false});
    setInput('');
  }

  function toggleTaskStatus(task) {
    setTaskStatus({...taskStatus, [task]: !taskStatus[task]});
  }

  function removeTask(taskToRemove) {
    const updatedTasks = tasks.filter(task => task !== taskToRemove);
    const updatedStatus = { ...taskStatus };
    delete updatedStatus[taskToRemove];
    setTasks(updatedTasks);
    setTaskStatus(updatedStatus);
  }

  function removeLocalStorage() {
    if(tasks.length === 0) {
      Swal.fire ({
        title: 'There is no task yet',
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: 'black'
      })
    return;
    }

    Swal.fire ({
      title: 'Are you sure?',
      text: 'Do you really want to REMOVE the WHOLE TASKS?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Remove all',
      cancelButtonText: 'Cancel',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black'
    }).then((result) => {
      if(result.isConfirmed) {
        localStorage.removeItem('@task');
        setTasks([]);
        setTaskStatus({});
        Swal.fire({
          title: 'Tasks cleared',
          icon: 'success',
          confirmButtonColor: 'black',
          confirmButtonText: 'Ok'
        });
      }
      
    });
   
    
  }
  
  
  return (
    <div>
      <header class="header">
      <h1>To do list</h1>
      </header>

      <form onSubmit={handleRegister}>
        <label>Task:</label><br/>
        <input
        placeholder="Type a task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        /><br/>

        <button type="submit">Add</button>

      </form>

      <ul>
        {tasks.map( task => (
          <li key={task}>
          <input
          type="checkbox"
          checked={taskStatus[task]}
          onChange={() => toggleTaskStatus(task)}
          />
          <span style={{ color: taskStatus[task] ? 'lightgreen' : 'white' }} class="tasks">
          &nbsp;
          {task}
          &nbsp;
          </span>
          <button onClick={() => removeTask(task)} class="arda">
          <FontAwesomeIcon icon={faTrash} />
          </button>
          </li>
        ))}

      </ul>

      {tasks.length > 0 && (
        <button onClick={removeLocalStorage} class="removeAll">
        <FontAwesomeIcon icon={faTrash}/>
          &nbsp;Remove tasks
        </button>
      )}
      <footer class="footer">
        <p>by: Caio André</p>
      </footer>


    </div>
  )


}

export default App;

