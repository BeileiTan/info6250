const uuid = require('uuid').v4;

function makeCourseList() {
  // These are hardcoded initial state when we restart the server
  const id1 = uuid();
  const id2 = uuid();

  const courseList = {};
  const courses = {};

  courseList.contains = function contains(id) {
    return !!courses[id];
  };

  courseList.getCourses = function getCourses() {
    return courses;
  };

  courseList.addCourse = function addCourse(course) {
    const id = uuid();
    courses[id] = {
      id,
      course,
      done: false,
      date: '',
      rank: 0,
      difficulty: '',
    };
    return id;
  };

  courseList.getCourse = function getCourse(id) {
    return courses[id];
  };

  courseList.updateCourse = function updateCourse(id, todo) {
    courses[id].done = todo.done ?? courses[id].done;
    courses[id].course = todo.course || courses[id].course;
    courses[id].date = todo.date ?? courses[id].date;
    courses[id].rank = todo.rank ?? courses[id].rank;
    courses[id].difficulty = todo.difficulty ?? courses[id].difficulty;
  };


  courseList.deleteCourse = function deleteCourse(id) {
    delete courses[id];
  };

  return courseList;
};

module.exports = {
    makeCourseList,
};