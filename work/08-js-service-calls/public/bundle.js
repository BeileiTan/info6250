/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchDelete": () => (/* binding */ fetchDelete),
/* harmony export */   "fetchGet": () => (/* binding */ fetchGet),
/* harmony export */   "fetchGetWord": () => (/* binding */ fetchGetWord),
/* harmony export */   "fetchLogin": () => (/* binding */ fetchLogin),
/* harmony export */   "fetchUpdate": () => (/* binding */ fetchUpdate)
/* harmony export */ });
// This is a sample file that demonstrates
// how you can write an abstraction around
// a fetch() call
// This exported function returns a promise
// that resolves with data
// or rejects with an error object
//
// The caller of this function can decide
// what to do with the data
// or what to do with the error
//
// You can add to this file and use this function
// or write your own files/functions

function fetchLogin(username) {
  return fetch('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json' // set this header when sending JSON in the body of request
    },

    body: JSON.stringify({
      username: username
    })
  })
  // fetch() rejects on network error
  // So we convert that to a formatted error object
  // so our caller can handle all "errors" in a similar way
  ["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      // response.ok checks the status code from the service
      // This service returns JSON on errors,
      // so we use that as the error object and reject
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json(); // happy status code means resolve with data from service
  });
}

function fetchGet() {
  // Return a promise of parsed results or error object
  return fetch("/api/session/") // Using a relative url so we use the existing current page domain + protocol
  ["catch"](function () {
    // network error is rejected promise
    return Promise.reject({
      error: 'networkError'
    }); // We return rejected promise with an error object!
  }).then(function (response) {
    if (!response.ok) {
      // Some sort of error status code
      return response.json().then(function (info) {
        return Promise.reject(info);
      }); // We return rejected promise with parsed error object
    }

    return response.json(); // Parse the successful response data
  });
  // Using any successful data is done by the caller, not by this function
  // - Keeps this function reusable and decoupled from the consumption of the results
}
;
function fetchUpdate(word) {
  return fetch('/api/word/', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json' // set this header when sending JSON in the body of request
    },

    body: JSON.stringify({
      word: word
    })
  })
  // fetch() rejects on network error
  // So we convert that to a formatted error object
  // so our caller can handle all "errors" in a similar way
  ["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      // response.ok checks the status code from the service
      // This service returns JSON on errors,
      // so we use that as the error object and reject
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json(); // happy status code means resolve with data from service
  });
}

function fetchGetWord() {
  // Return a promise of parsed results or error object
  return fetch('/api/word/') // Using a relative url so we use the existing current page domain + protocol
  ["catch"](function () {
    // network error is rejected promise
    return Promise.reject({
      error: 'networkError'
    }); // We return rejected promise with an error object!
  }).then(function (response) {
    if (!response.ok) {
      // Some sort of error status code
      return response.json().then(function (info) {
        return Promise.reject(info);
      }); // We return rejected promise with parsed error object
    }

    return response.json(); // Parse the successful response data
  });
}

function fetchDelete() {
  return fetch('/api/session/', {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PAGES": () => (/* binding */ PAGES),
/* harmony export */   "state": () => (/* binding */ state)
/* harmony export */ });
var PAGES = {
  WORD: 'word',
  LOGIN: 'login'
};
var state = {
  page: PAGES.LOGIN
};


/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _state_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state.js */ "./src/state.js");

function render(state, rootEl, storedWord, username, error) {
  if (state.page === _state_js__WEBPACK_IMPORTED_MODULE_0__.PAGES.WORD) {
    var htmlWord = generateDataHtml(storedWord, username);
    rootEl.innerHTML = htmlWord;
    return;
  }
  if (state.page === _state_js__WEBPACK_IMPORTED_MODULE_0__.PAGES.LOGIN) {
    var htmlLogin = generateLogin();
    rootEl.innerHTML = htmlLogin;
    return;
  }
  if (state.page === _state_js__WEBPACK_IMPORTED_MODULE_0__.PAGES.Error) {
    var htmlError = generateError(error);
    rootEl.innerHTML = htmlError;
    return;
  }
}
function generateDataHtml(storedWord, username) {
  var htmlWord = "\n    <form>\n        <div class=\"img-container\">\n            <img src=\"/home.png\" alt=\"Avatar\" class=\"avatar\">\n        </div>\n        <h2 class=\"store-word\">Store word for this user: <span> ".concat(username, " </span></h2>\n        <div class=\"word\"> \n        ").concat(storedWord, "  \n        </div>\n        <div class=\"container\">\n            <label for=\"word\">Change the stored word: </label>\n            <input type=\"text\" id=\"word\" name=\"word\" value=\"\" required>\n        </div>\n        <button type=\"submit\" class=\"word-submit\">Submit</button>\n     </form>\n     <form>\n     <button type=\"submit\" class=\"logout-btn\" data-target=\"login\">Logout</button>\n     </form>\n    ");
  return htmlWord;
}
function generateLogin() {
  var htmlLogin = "\n    <div class=\"login-form\">\n        <h1> Login Page</h1>\n        <form>\n            <div class=\"img-container\">\n                <img src=\"/login.png\" alt=\"Avatar\" class=\"avatar\">\n            </div>\n            <div class=\"container\">\n                <label for=\"username\">Username: </label>\n                <input type=\"text\" id=\"username\" name=\"username\" value=\"\">\n            </div>\n            <button type=\"submit\" class=\"login_load\" data-target=\"word\">Login</button>\n        </form>\n    </div>    \n    ";
  return htmlLogin;
}
function generateError(error) {
  var htmlError = "\n    <div class=\"login-form\">\n    <h1> Login Page</h1>\n    <form>\n        <div class=\"img-container\">\n            <img src=\"/login.png\" alt=\"Avatar\" class=\"avatar\">\n        </div>\n        <p>This is error message: ".concat(error, "</p>\n        <div class=\"container\">\n            <label for=\"username\">Username: </label>\n            <input type=\"text\" id=\"username\" name=\"username\" value=\"\">\n        </div>\n        <button type=\"submit\" class=\"login_load\" data-target=\"word\">Login</button>\n    </form>\n</div>    \n");
  return htmlError;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view */ "./src/view.js");



var rootEl = document.querySelector('.main');
rootEl.addEventListener('click', function (e) {
  if (e.target.classList.contains('login_load')) {
    e.preventDefault();
    var inputUsername = document.querySelector('#username');
    var username = inputUsername.value;
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username)["catch"](function (error) {
      console.warn("replace this with actual error reporting", error);
      _state__WEBPACK_IMPORTED_MODULE_1__.state.page = _state__WEBPACK_IMPORTED_MODULE_1__.PAGES.Error;
      if (error.error === "required-username") {
        var errorMessage = "Invalid username, please try another one that only include letters ";
        (0,_view__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_1__.state, rootEl, '', '', errorMessage);
        return;
      } else {
        var _errorMessage = "You got a wrong password, please try again ";
        (0,_view__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_1__.state, rootEl, '', '', _errorMessage);
        return;
      }
    }).then((0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchGet)()).then(function (data) {
      if (data.username) {
        (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchGetWord)().then(function (users) {
          _state__WEBPACK_IMPORTED_MODULE_1__.state.page = e.target.dataset.target;
          (0,_view__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_1__.state, rootEl, users.storedWord, users.username);
        });
      }
    });
  }
  if (e.target.classList.contains('word-submit')) {
    e.preventDefault();
    var inputWord = document.querySelector('#word');
    var word = inputWord.value;
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchUpdate)(word);
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchGetWord)().then(function (users) {
      (0,_view__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_1__.state, rootEl, users.storedWord, users.username);
    })["catch"](function (error) {
      console.warn("replace this with actual error reporting", error);
    });
  }
  if (e.target.classList.contains('logout-btn')) {
    _state__WEBPACK_IMPORTED_MODULE_1__.state.page = e.target.dataset.target;
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchDelete)();
  }
});
(0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchGet)().then(function (data) {
  if (data.username) {
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchGetWord)().then(function (users) {
      _state__WEBPACK_IMPORTED_MODULE_1__.state.page = _state__WEBPACK_IMPORTED_MODULE_1__.PAGES.WORD;
      (0,_view__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_1__.state, rootEl, users.storedWord, users.username);
    });
    return;
  }
});
(0,_view__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_1__.state, rootEl);
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map