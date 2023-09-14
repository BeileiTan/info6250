# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
=======
# React Services

* Start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'react-services' (`git checkout -b react-services`)
* Create a react application in this directory using create-react-app
* Modify and add files in `src/` to fulfill the requirements below
* Add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the TA(s) and I as reviewers on the PR.  
* Due by **Wed Apr 12 11:59pm (PT)**

## Goals

- Create a React application that makes use of REST-based services
- Have a service server that can serve the static files built by `npm run build`
- Configure the create-react-app (CRA) dev server to proxy service requests
- Demonstrate an understanding of calling services using React
- Demonstrate an understanding of the `useEffect` hook as described in class
- Demonstrate an understanding of displaying loading states
- Demonstrate an understanding of the two different servers involved during development
  - And the single server involved during production

## Assignment Goals and Requirements
- The application will have service-based login/logout
  - As normal username "dog" will be treated as a denied user (not an invalid username, but a disallowed user)
- The application will show a logged in user their "stored word"
- The application will allow a logged in to change their "stored word"
- The "stored word" is stored per user on the server
- The page will check for an existing session on page load
  - a user that is already logged in will not have to log in again
  - While the app is waiting on the service call(s) for this check a loading indicator is displayed to the user
  - This indicator can be image, css, and/or HTML-based, but must be clearly visible for testing, however briefly
- Your application can be tested by running `npm install` and
  - running `npm start` to start the services server on port 4000
    - NOT the default create-react-behavior!
  - running (in a separate terminal) `npm dev` to start the dev server on port 3000
    - Note: this requires change the `scripts` section of package.json
  - visiting http://localhost:3000 in the browser
- Your application can ALSO work by:
  - running `npm run build` to create the static files in `build/`
  - running `npm start` to start the services server
  - visiting http://localhost:4000 in the browser

## Updating the created package.json
- run `npm install express uuid cookie-parser` in the created react project directory (where the package.json file is)
- add `"proxy": "http://localhost:4000",` to the package.json

## Security And Error Reporting Requirements
- Both username AND the stored word should be allow-listed against criteria of your choice
  - This MUST be enforced on the service-side
  - This MAY be enforced on the client-side
  - Any received errors from a service because of user input should result in a meaningful message to the user
  - If a service is unreachable a message should be displayed to the user

## Visual Requirements
- Provide at least basic visual styling to provide distinct areas for different parts of the application and sufficient visual spacing

## Restrictions
- All components must be .jsx files named in MixedCase
- Components and server-side files should have good separation of concerns
  - not too large
  - not doing too much
  - same logic as splitting up functions
- Components  should have good, accurate, meaningful names
- state values should have good, accurate, meaningful names
- Component files should match the component name
- Components must each be in a single file with no other exported values
- Logic that is not about JSX should be imported from .js files
- .js files and functions should have good, accurate, meaningful names
- CSS should be semantic class names, either kebab-base or BEM style
- Service code should match the quality requirements from previous assignments

## Additional Requirements
- All services will return JSON (if they return a body) and receive JSON (if they receive a body)
- Do NOT use localStorage, sessionStorage, IndexedDB, cookies, or other forms of client-side storage, except a cookie to hold a `sid` value
- Do NOT use external JS other than that demonstrated in class
  - Note: You may use nodemon for your own development of the server, but it should not be in any of the package.json scripts described in this README.
- Do NOT interact with the browser url, including hash fragment
- You may not use `document.querySelector()` or otherwise modify the DOM directly
- You may not use `useRef`, or `ref` props from React (If you do not know what I mean, that is fine)
- Follow the best practices described in class, in the code-review doc, and in the best-practices in the readings
- Use Semantic HTML as much as you can
- Follow any suggestions previously given to you in code reviews
- Do NOT include files in your PR that are outside the assignment (no IDE configs, `node_modules/`, etc)
  - Note: create-react-app installs many files.  For now, those are fine to include in your PR, except for `node_modules/`
- Do not use external CSS libraries
  - Exception: You may use CSS files linked from https://css.gg/ for icons and/or spinners
  - Exception: You may use Google fonts
* Use arrays and objects when they each make sense
* Do not use `var`. Use `const` and `let` appropriately
* Do not use `alert`, `prompt` or other blocking JS
* Do not use poor variable and function names
* Do not have functions that are too big/do too much
* Do not have console.log messages from debugging
* Do not have commented out code
- You may not use floats to do more than manage flowing text with images
- You may not use HTML tables or CSS table layouts
- You may not use Set() or Map() (not the same as the .map() method on an array, that is allowed)
- You may not use CSS preprocessors, minifiers, or other tools to modify your CSS
  - I and the TA(s) must be able to read it easily
