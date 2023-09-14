const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
// PORT=4000 node server.js
// lets us run on a different port from the dev server from `npm start`
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

const users = require('./user');
const users_info = require('./user-info');
const sessions = require('./sessions');
const courses = require('./courses');


// Sessions
app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const email = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !users_info.isValidEmail(email)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    res.json({ email });
  });

  app.post('/api/session', (req, res) => {
    const { email, password } = req.body;

    const user = users_info[email];

    if(!user){
        res.status(401).json({ error : 'not-registered'});
        return;
    }

    if(!users_info.isValidEmail(email)) {
      res.status(400).json({ error: 'required-email' });
      return;
    }

    if(user.password !== password){
      res.status(401).send({ error : 'auth-insufficient' });
    }

    const sid = sessions.addSession(email);
    const showAllData = users.getUserData(email);

    if(!showAllData){
      users.addUserData(email, courses.makeCourseList());
    }

    res.cookie('sid', sid);
    res.json(users.getUserData(email).getCourses());

  });

  app.post('/api/signup', (req, res) => {
    const{name, email, password} = req.body;
    if (users_info[email]) {
      res.status(409).json({ error :'auth-conflict'});
    } else {
        if(!users_info.isValidEmail(email)){
            res.status(400).json({ error: 'required-email' });
            return;
        }else if(!users_info.isValidName(name)){
            res.status(400).json({ error: 'required-name' });
            return;
        }else{
            users_info[email] = { name, email, password };
            const sid = sessions.addSession(email);
            const showAllData = users.getUserData(email);
            if(!showAllData){
              users.addUserData(email, courses.makeCourseList());
            }
            res.cookie('sid', sid);
            res.json(users.getUserData(email).getCourses());
        }
    }
  });

  app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const email = sid ? sessions.getSessionUser(sid) : '';
  
    if(sid) {
      res.clearCookie('sid');
    }
  
    if(email) {
      // Delete the session, but not the user data
      sessions.deleteSession(sid);
    }
  
    // We don't report any error if sid or session didn't exist
    // Because that means we already have what we want
    res.json({ email });
  });

  //Tasks
  app.get('/api/courses', (req, res) => {
    // Session checks for these are very repetitive - a good place to abstract out
    // I've left the repetitive sections here for ease of learning
    const sid = req.cookies.sid;
    const email = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !users_info.isValidEmail(email)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    res.json(users.getUserData(email).getCourses());
  });


  app.post('/api/courses', (req, res) => {
    const sid = req.cookies.sid;
    const email = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !users_info.isValidEmail(email)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const { course } = req.body;
    if(!course) {
      res.status(400).json({ error: 'required-task' });
      return;
    }
    const courseList = users.getUserData(email);
    const id = courseList.addCourse(course);
    res.json(courseList.getCourse(id));
  });

  app.get('/api/courses/:id', (req, res) => {
    const sid = req.cookies.sid;
    const email = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !users_info.isValidEmail(email)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const courseList = users.getUserData(email);
    const { id } = req.params;
    if(!courseList.contains(id)) {
      res.status(404).json({ error: `noSuchId`, message: `No todo with id ${id}` });
      return;
    }
    res.json(courseList.getCourse(id));
  });

  app.put('/api/courses/:id', (req, res) => {
    const sid = req.cookies.sid;
    const email = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !users_info.isValidEmail(email)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const courseList = users.getUserData(email);
    const { id } = req.params;
    const { course, done=false, date, rank, difficulty } = req.body;
    // Full Replacement required for a PUT
    if(!course) {
      res.status(400).json({ error: 'required-task' });
      return;
    }
    if(!courseList.contains(id)) {
      res.status(404).json({ error: `noSuchId`, message: `No todo with id ${id}` });
      return;
    }
    courseList.updateCourse(id, { course, done, date, rank, difficulty });
    res.json(courseList.getCourse(id));
  });

  app.patch('/api/courses/:id', (req, res) => {
    const sid = req.cookies.sid;
    const email = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !users_info.isValidEmail(email)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const { id } = req.params;
    const { course, done, date, rank, difficulty } = req.body;
    const courseList = users.getUserData(email);
    if(!courseList.contains(id)) {
      res.status(404).json({ error: `noSuchId`, message: `No todo with id ${id}` });
      return;
    }
    courseList.updateCourse(id, { course, done, date, rank, difficulty });
    res.json(courseList.getCourse(id));
  });
  
  app.delete('/api/courses/:id', (req, res) => {
    const sid = req.cookies.sid;
    const email = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !users_info.isValidEmail(email)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const { id } = req.params;
    const courseList = users.getUserData(email);
    const exists = courseList.contains(id);
    if(exists) {
      courseList.deleteCourse(id);
    }
    res.json({ message: exists ? `todo ${id} deleted` : `todo ${id} did not exist` });
  });


  app.listen(PORT, () => console.log(`http://localhost:${PORT}`));