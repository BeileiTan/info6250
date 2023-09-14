import { useState } from 'react';


function AddCourseForm({ onAddCourse }){

    const [course, setCourse] = useState('');

    function onSubmit(e) {
        e.preventDefault(); // Don't forget, confusion follows if form submits
        setCourse('');
        onAddCourse(course);
    }

    function onTyping(e) {
        setCourse(e.target.value);
      }

    return (
        <div className='bottom-section'>
            <div className='input-container_task'>
                <form className="new-task-form" action="#/add" onSubmit={onSubmit}>
                <input className="add_task_input" value={course} onChange={onTyping} placeholder='What do you plan this term?'/>
                <input type="submit" className="add_task_button" value="Add Course"/>
                </form>
                <p class="footer">please click the ✅ after editing the data</p>
            </div>
        </div>
    );

}

export default AddCourseForm;