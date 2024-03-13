import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function App() {

  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState(() => {
    const tasksStorage = localStorage.getItem('@task');
    return tasksStorage ? JSON.parse(tasksStorage) : [];
  });

  useEffect(() => {

    const tasksStorage = localStorage.getItem('@task');

    if(tasksStorage) {
      setTasks(JSON.parse(tasksStorage))
    }

  }, [])

  useEffect(() => {
    
    localStorage.setItem('@task', JSON.stringify(tasks));
    
  }, [tasks]);

  function handleRegister(e) {
    e.preventDefault();

    setTasks([...tasks, input]);
    setInput('');

    if(input === '') {
      alert('You must type something');
    }

  }

  function removeLocalStorage() {
    Swal.fire ({
      title: 'Are you sure?',
      text: 'Do you want to REMOVE the WHOLE TASKS?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Remove all',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if(confirmDelete) {
        localStorage.removeItem('@tasks');
        setTasks([]);
        Swal.fire('Tasks cleared', '', 'success')
      }
    });
   
    
  }
  
  
  return (
    <div>
      <h1>Registering user</h1>

      <form onSubmit={handleRegister}>
        <label>Task name:</label><br/>
        <input
        placeholder="Type a task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        /><br/>

        <button type="submit">Register</button>

      </form>

      <ul>
        {tasks.map( task => (
          <li key={task}>{task}</li>
        ))}
      </ul>

      <br/>
      <button onClick={ removeLocalStorage }>Remove tasks</button>

    </div>
  )


}

export default App;

