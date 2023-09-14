import './App.css';

import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
} from './constants';

import { useState, useEffect} from 'react';

import { fetchSession, 
         fetchLogin, 
         fetchSignup,  
         fetchLogout,
         fetchCourses, 
         fetchAddCourse,
         fetchUpdateCourse,
         fetchDeleteCourse,
} from "./services";

import LoginForm from './LoginForm';
import Loading from './Loading';
import Status from './Status';
import Controls from './Controls';
import SignupForm from './SignupForm';
import AddCourseForm from './AddCourseForm';
import Courses from './Courses'


function App() {

  const [ error, setError ] = useState('');
  const [ loginStatus, setLoginStatus ] = useState(LOGIN_STATUS.NOT_LOGGED_IN); // one variable covers multiple cases
  const [ isTodoPending, setIsTodoPending ] = useState(false);
  const [ courses, setCourses ] = useState({});
  const [ isLogin, setIsLogin] = useState(true);
  const [ lastAddedCourseId, setLastAddedCourseId ] = useState();

  function onLogin( email, password ) {
    setIsTodoPending(true);
    fetchLogin(email, password)
    .then( courses => {
      setError(''); // in case another action had set an error
      setCourses( courses );
      setIsTodoPending(false);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
    })
    .catch( err => {
      setError(err?.error || 'ERROR');
    });
  }

  function onLogout() {
    setError('');
    setIsLogin(true);
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    setCourses({});
    fetchLogout()
    .catch( err => {
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
    });
  }

  function toggleAuth(){
    setIsLogin(!isLogin);
    setError('');
  }

  function onSignup(name, email, password){
    setIsTodoPending(true);
    fetchSignup(name,email, password)
    .then( courses => {
      setError(''); // in case another action had set an error
      setCourses( courses );
      setIsTodoPending(false);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
    })
    .catch( err => {
      setError(err?.error || 'ERROR');
    });
  }

  function onAddCourse(course){
    fetchAddCourse(course)
    .then(course => {
      setCourses({
        ...courses,
        [course.id] : course,
      });
      setLastAddedCourseId(course.id);
    })
    .catch( err => {
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
    });
  }

  function onDeleteCourse(id){
    setError('');
    setIsTodoPending(true);
    fetchDeleteCourse(id)
    .then(() => {
      return fetchCourses();
    })
    .then(courses => {
      setCourses(courses);
      setIsTodoPending(false);
    })
    .catch( err => {
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
    });
  }


  function onUpdateCourse(id, done, date, rank, difficulty) {
    const updateCourse = {...courses[id]};
    updateCourse.done = done;
    updateCourse.date = date;
    updateCourse.rank = rank;
    updateCourse.difficulty = difficulty;
    fetchUpdateCourse(id, updateCourse)
    .then( updatedCourse => { // Service call returns the updated todo
      // Don't modify existing state object!
      setCourses({
        ...courses, // copy the existing state object
        [id]: updatedCourse, // override the existing todo with this id
      });
      setLastAddedCourseId('');
    })
    .catch( err => {
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
    });
  }

function checkForSession() {
    fetchSession()
    .then( session => { // The returned object from the service call
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN); // We do not have todos yet!
      return fetchCourses(); // By returning this promise we can chain the original promise
    })
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION }) // Expected, not a problem
      }
      return Promise.reject(err); // Pass any other error unchanged
    })
    .then( courses => {
      setCourses(courses);
    })
    .catch( err => {
      if( err?.error === CLIENT.NO_SESSION ) { // expected "error"
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        // Not yet logged in isn't a reported error
        return;
      }
      // For unexpected errors, report them
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
    });
  } 

  useEffect(
    () => {
      checkForSession();
    },
    []
  );

  return (
    <div className="app">
      <main className="">
      { error && <Status error={error} />}
      { loginStatus === LOGIN_STATUS.PENDING && <Loading className="login__waiting">Loading user...</Loading> }
      { loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && (
        isLogin ? (
          <LoginForm toggleAuth={toggleAuth} onLogin={onLogin} />
        ) : (
          <SignupForm toggleAuth={toggleAuth} onSignup={onSignup} /> )
      )}
      { loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div className="content">
            <Controls onLogout={onLogout}/>
            <Courses 
              courses={courses}
              isTodoPending={isTodoPending}
              lastAddedCourseId={lastAddedCourseId}
              onDeleteCourse={onDeleteCourse}
              onUpdateCourse={onUpdateCourse}
            />
            <AddCourseForm onAddCourse={onAddCourse} />
          </div>
         )}
       </main>
    </div>
  );
}

export default App;
