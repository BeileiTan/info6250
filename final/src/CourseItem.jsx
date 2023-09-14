import { useState } from "react";
function CourseItem({
    course,
    isLastAdded,
    onDeleteCourse,
    onUpdateCourse,
}){
    const [done, setDone] = useState(course.done);
    const [date, setDate] = useState(course.date);
    const [rank, setRank] = useState(course.rank);
    const [difficulty, setDifficulty] = useState(course.difficulty);


    function handleSubmit(event) {
        event.preventDefault();
        onUpdateCourse(course.id, 
          done,
          date,
          rank,
          difficulty,
        );
      } 

    return(
        <div class="new-content">
          <form className="form-inline" onSubmit={handleSubmit}>
           <label>
            <input
                data-id={course.id}
                type="checkbox"
                checked={done}
                onChange={(e) => setDone(e.target.checked)}
                className="checkbox-input"
            />
            <span
                data-id={course.id}
                className="course.content"
            >
                {course.course}
            </span>
            <input 
                data-id={course.id}
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <span>Priority:</span>
            <input 
                data-id={course.id}
                type="number"
                value={rank}
                min="0"
                onChange={(e) => setRank(e.target.value)}
            />
            <select 
            data-id={course.id} 
            value={difficulty} 
            onChange={(e) => setDifficulty(e.target.value)
            }>
                <option value="">-- Select Difficulty --</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
          </label>
          <div className="actions">
            <button type="submit" className="update">✅</button>
          </div>
          <button
                data-id={course.id}
                onClick={ (e) => {
                const id = e.target.dataset.id;
                onDeleteCourse(id);
                }}
                >
            &#10060;
          </button>
        </form>
    </div>
    )
}
export default CourseItem;