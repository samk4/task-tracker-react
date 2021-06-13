import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { useState, useEffect } from 'react'
import About from './components/About'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(
    false
  )
  const [tasks, setTasks] = useState([])

  useEffect(() => { 
    const getTasks = async () =>{
      const dbTasks = await fetchTasks();
      setTasks(dbTasks)
    } 

    getTasks()
  },[])
   


  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data;
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data;
  }
 
  //delete task
  const deleteTask = async (id) =>{ 
    
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'DELETE'
    }) 

    setTasks(tasks.filter((task) => task.id !== id ))
  }

  //toggle reminder
  const toggleReminder = async (id) =>{

    const task = await fetchTask(id) 

    // console.log()

    await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      headers: {
        "content-type" : "application/json"
      },
      body: JSON.stringify({...task,reminder:!task.reminder})
    })

    setTasks(
      tasks.map((task) =>
        task.id === id ? { 
          ...task, reminder:!task.reminder
        }: task
      )
    )     
  }

  //addTask
  const addTask = async (task) => {
    // const id = Math.floor(Math.random() * 1000) + 1;
    // const newTask = { id, ...task}
    // setTasks([...tasks, newTask])
    const res = await fetch('http://localhost:5000/tasks',{
      method: 'POST',
      headers:{
        'Content-type':'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])
    
  }
 

  return (
    <Router>
      <div className="container">
        <Header title="Task Tracker" onAdd={() => setShowAddTask(
          !showAddTask
        )} showAddTask={showAddTask}/>
        
        <Route path='/' exact render={(props)=>(
          <>
          { showAddTask && <AddTask onAdd={addTask}/>}
          {tasks.length > 0 ? ( 
          <Tasks 
          onDelete={deleteTask} 
          tasks={tasks}
          onToggle = {toggleReminder}
          /> 
          ) :'No tasks available'  }
          </>
        )}/>
        <Route path='/about' component={About} />
        <Footer/>
      </div>
    </Router>
  );
}


export default App;
 