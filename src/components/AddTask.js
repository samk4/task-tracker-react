import { useState } from "react"

const AddTask = ({onAdd}) => {
    
    const [text,setText] = useState('');
    const [day,setDay] = useState('');
    const [reminder,setReminder] = useState(false); 

    const onSubmit = (e) => {
        e.preventDefault();
        
        if(!text){
            alert('Please add a task')
            return;
        }

        onAdd({text,day,reminder});

        setReminder(false);
        setText('');
        setDay('');
    }

    return  (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input type='text' placeholder='Enter task' value={text} onChange={(e)=>setText(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Date</label>
                <input type='text' placeholder='Enter Date & time' value={day} onChange={(e) => setDay(e.target.value)}/>
            </div>
            <div className='form-control form-control-check'>
                <label>Reminder</label>
                <input 
                style={{cursor:"pointer",width: "30px",   height: "30px" }}
                    type='checkbox' 
                    value={reminder} 
                    checked={reminder}
                    onChange={(e)=>{setReminder(e.currentTarget.checked)}}
                />
            </div>
            <div className='form-control ' >
                <input className='btn' type='submit' value='Add Task' />
            </div>
        </form>
    )
}

export default AddTask