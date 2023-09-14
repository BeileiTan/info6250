import Loading from './Loading';
import CourseItem from './CourseItem';

function Couses({
    courses,
    isTodoPending,
    setLastAddedCourseId,
    onDeleteCourse,
    onUpdateCourse,
}){
    const SHOW = {
        PENDING: 'pending',
        COURSES: 'courses',
    };

    let show;
    if(isTodoPending) {
      show = SHOW.PENDING;
    } else {
      show = SHOW.COURSES;
    }

    return(
        <div>
        {show === SHOW.PENDING && <Loading className="todos__waiting">Loading Courses...</Loading>}
        { show === SHOW.COURSES && (
            <div>
                <h1 className='head-h1'>Course List 2023</h1>
                <section className='task-list'>
                    <h2>Tasks</h2>
                    <div className='tasks'>
                        <div className='task'>
                            <ul className="">
                            { Object.values(courses).map( course => (
                                <li className="todo" key={course.id}>
                                <CourseItem
                                    course={course}
                                    isLastAdded={setLastAddedCourseId===course.id}
                                    onDeleteCourse={onDeleteCourse}
                                    onUpdateCourse={onUpdateCourse}
                                />
                                </li>
                            ))}
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
          )}
        </div>
    )

}

export default Couses;