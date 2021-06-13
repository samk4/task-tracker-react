import Task from './Task'

const Tasks = ({tasks, onDelete, onToggle}) => {
    return (
        <>
        {tasks.map( (task) => (
            <Task onDelete={onDelete} key={task.id} task={task} onToggle={onToggle} />
        ) )}
        </>
    )
}
 

export default Tasks