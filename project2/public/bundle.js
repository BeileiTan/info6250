/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CLIENT": () => (/* binding */ CLIENT),
/* harmony export */   "MESSAGES": () => (/* binding */ MESSAGES),
/* harmony export */   "SERVER": () => (/* binding */ SERVER)
/* harmony export */ });
var _MESSAGES;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// Constants benefits
// - reduces risk of typos (IDE can code-complete)
// - easier to confirm it is correct (easier to check properties than strings)
// - If a value changes, you can change it in one place and the rest of the code can continue to use the constant

// Might be SERVER_CODES and CLIENT_CODES if we had more and different constants
var SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  REQUIRED_TASK: 'required-task',
  TASK_MISSING: 'noSuchId' // Someone was inconsistent!
};

var CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession'
};
var MESSAGES = (_MESSAGES = {}, _defineProperty(_MESSAGES, CLIENT.NETWORK_ERROR, 'Trouble connecting to the network.  Please try again'), _defineProperty(_MESSAGES, SERVER.AUTH_INSUFFICIENT, 'Your username/password combination does not match any records, please try again.'), _defineProperty(_MESSAGES, SERVER.REQUIRED_USERNAME, 'Please enter a valid (letters and/or numbers) username'), _defineProperty(_MESSAGES, SERVER.REQUIRED_TASK, 'Please enter the task to do'), _defineProperty(_MESSAGES, "default", 'Something went wrong.  Please try again'), _MESSAGES);

/***/ }),

/***/ "./src/listeners.js":
/*!**************************!*\
  !*** ./src/listeners.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addAbilityToAddChat": () => (/* binding */ addAbilityToAddChat),
/* harmony export */   "addAbilityToLogin": () => (/* binding */ addAbilityToLogin),
/* harmony export */   "addAbilityToLogout": () => (/* binding */ addAbilityToLogout)
/* harmony export */ });
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./src/render.js");



function addAbilityToLogin(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl;
  // Using 'submit' so we can get both submit via button-click and by "enter"
  appEl.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!e.target.classList.contains('login__form')) {
      return;
    }
    var username = appEl.querySelector('.login__username').value;
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.waitOnChats)();
    (0,_render__WEBPACK_IMPORTED_MODULE_2__.render)({
      state: state,
      appEl: appEl
    }); // show loading state
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(function (chats) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.login)(username);
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setChats)(chats.messageLists, chats.senderLists);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__.render)({
        state: state,
        appEl: appEl
      });
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR'); // Ensure that the error ends up truthy
      (0,_render__WEBPACK_IMPORTED_MODULE_2__.render)({
        state: state,
        appEl: appEl
      });
    });
  });
}
function addAbilityToLogout(_ref2) {
  var state = _ref2.state,
    appEl = _ref2.appEl;
  appEl.addEventListener('click', function (e) {
    if (!e.target.classList.contains('controls__logout')) {
      return;
    }
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
    (0,_render__WEBPACK_IMPORTED_MODULE_2__.render)({
      state: state,
      appEl: appEl
    });
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)()["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR'); // Ensure that the error ends up truthy
      (0,_render__WEBPACK_IMPORTED_MODULE_2__.render)({
        state: state,
        appEl: appEl
      });
    });
  });
}
function addAbilityToAddChat(_ref3) {
  var state = _ref3.state,
    appEl = _ref3.appEl;
  appEl.addEventListener('submit', function (e) {
    if (!e.target.classList.contains('add__form')) {
      return;
    }
    var text = appEl.querySelector('.add__chat').value;
    // Here I elect not show a waiting status...what impact could that have?
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchAddChat)(text).then(function (chat) {
      // Notice we get the id of the new todo from the returned todo
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.addChat)({
        id: chat.message.id,
        chat: chat.message,
        name: chat.sender.sender,
        sender: chat.sender
      });
      (0,_render__WEBPACK_IMPORTED_MODULE_2__.render)({
        state: state,
        appEl: appEl
      });
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR'); // Ensure that the error ends up truthy
      (0,_render__WEBPACK_IMPORTED_MODULE_2__.render)({
        state: state,
        appEl: appEl
      });
    });
  });
}

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
function render(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl;
  var html = "\n    <main class=\"\">\n        ".concat(generateStatusHtml(state), "\n        <div id=\"chat-app\">\n          <div id=\"login\">\n          ").concat(generateLoginHtml(state), "\n          </div>\n        ").concat(generateContentHtml(state), "\n        </div>\n    </main>\n    ");
  appEl.innerHTML = html;
}
function generateStatusHtml(state) {
  return "\n        <div class=\"status\">".concat(state.error, "</div>\n    ");
}
function generateLoginHtml(state) {
  if (state.isLoginPending) {
    return "\n        <div class=\"login__waiting\">Loading user...</div>\n      ";
  }
  if (state.isLoggedIn) {
    return "";
  }
  return "\n        <div id=\"title\">Login Page! Welcome to chat room</div>\n        <form class=\"login__form\" action=\"#/login\">\n          <label>\n            <span>Username:</span>\n            <input class=\"login__username\" value=\"\">\n          </label>\n          <button class=\"login__button\" type=\"submit\">Login</button>\n        </form>\n    ";
}
function generateContentHtml(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  if (state.isChatPending) {
    return "\n        <div class=\"content\">\n          ".concat(generateControlsHtml(state), "\n          <div class=\"todos__waiting\">Loading Chats...</div>\n        </div>\n      ");
  }
  return "\n        <div class=\"content\">\n          ".concat(generateControlsHtml(state), "\n          <div class=\"user-list\">\n            <div class=\"\">This is currently users: </div> \n          ").concat(getUserList(state), "\n            <div class=\"\">This is previously message lists: </div> \n          ").concat(getMessageList(state), "\n          </div>\n          ").concat(getAddChatHtml(state), "\n        </div>\n    ");
}
function generateControlsHtml(state) {
  return "\n          <div class=\"controls\">\n            <button class=\"controls__logout\">Logout</button>\n          </div>\n    ";
}
function getUserList(state) {
  return "<ul class=\"users\">" + Object.values(state.senders).map(function (sender) {
    return "\n      <li>\n        <div class=\"user\">\n          <span class=\"username\">".concat(sender.sender, "</span>\n        </div>\n      </li>\n    ");
  }).join('') + "</ul>";
}
function getMessageList(state) {
  return "<ol class=\"users\">" + Object.values(state.chats).map(function (chat) {
    return "\n     <li class=\"message-text\">\n      <div class=\"message\">\n            <p class=\"message-text\">".concat(chat.sender, ": ").concat(chat.text, "</p>\n      </div>\n    ");
  }).join('') + "</ol>";
}
function getAddChatHtml(state) {
  return "\n    <!doctype html>\n      <html>\n        <head>\n          <title></title>\n        </head>\n        <body>\n          <div class=\"outgoing\">\n            <form class=\"add__form\" action=\"#/add\">\n            <input class=\"add__chat\" value=\"\" name=\"text\" placeholder=\"Enter message to send\"/>\n            <button type=\"submit\" class=\"add__button\">Send</button>\n            </form>\n          </div>\n        </body>\n      </html>\n    ";
}

/***/ }),

/***/ "./src/renderMessage.js":
/*!******************************!*\
  !*** ./src/renderMessage.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderMessage": () => (/* binding */ renderMessage)
/* harmony export */ });
function renderMessage(_ref) {
  var state = _ref.state,
    updatesElement = _ref.updatesElement;
  var html = "\n        ".concat(generateContentMessageHtml(state), "\n    ");
  updatesElement.innerHTML = html;
}
function generateContentMessageHtml(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  if (state.isChatPending) {
    return "\n    <div class=\"content\">\n        ".concat(generateControlsHtml(state), "\n        <div class=\"todos__waiting\">Loading Chats...</div>\n    </div>\n    ");
  }
  return " \n        <div class=\"\">This is currently users: </div>  \n        ".concat(getUserList(state), "\n        <div class=\"\">This is previously message lists: </div> \n        ").concat(getMessageList(state), "\n");
}
function getUserList(state) {
  return "<ul class=\"users\">" + Object.values(state.senders).map(function (sender) {
    return "\n      <li>\n        <div class=\"user\">\n          <span class=\"username\">".concat(sender.sender, "</span>\n        </div>\n      </li>\n    ");
  }).join('') + "</ul>";
}
function getMessageList(state) {
  return "<ol class=\"users\">" + Object.values(state.chats).map(function (chat) {
    return "\n     <li class=\"message-text\">\n      <div class=\"message\">\n            <p class=\"message-text\">".concat(chat.sender, ": ").concat(chat.text, "</p>\n      </div>\n    ");
  }).join('') + "</ol>";
}

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchAddChat": () => (/* binding */ fetchAddChat),
/* harmony export */   "fetchChat": () => (/* binding */ fetchChat),
/* harmony export */   "fetchLogin": () => (/* binding */ fetchLogin),
/* harmony export */   "fetchLogout": () => (/* binding */ fetchLogout),
/* harmony export */   "fetchSession": () => (/* binding */ fetchSession)
/* harmony export */ });
function fetchSession() {
  return fetch('/api/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLogin(username) {
  return fetch('/api/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLogout() {
  return fetch('/api/session', {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchChat() {
  return fetch('/api/chats')["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchAddChat(text) {
  return fetch('/api/chats', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      text: text
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
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
/* harmony export */   "addChat": () => (/* binding */ addChat),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "login": () => (/* binding */ login),
/* harmony export */   "logout": () => (/* binding */ logout),
/* harmony export */   "setChats": () => (/* binding */ setChats),
/* harmony export */   "setError": () => (/* binding */ setError),
/* harmony export */   "waitOnChats": () => (/* binding */ waitOnChats),
/* harmony export */   "waitOnLogin": () => (/* binding */ waitOnLogin)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");

var state = {
  // We store these as an object because we will access by id
  chats: {},
  senders: {},
  isLoggedIn: false,
  isLoginPending: true,
  // We start with our login status unknown
  isChatPending: false,
  username: '',
  lastAddedChatId: '',
  error: ''
};
function waitOnLogin() {
  state.isLoggedIn = false;
  state.isLoginPending = true;
  state.username = '';
  state.chats = {};
  state.senders = {};
  state.error = '';
}
function login(username) {
  state.isLoggedIn = true;
  state.isLoginPending = false;
  state.username = username;
  state.error = '';
  state.lastAddedChatId = '';
}
function logout() {
  state.isLoggedIn = false;
  state.isLoginPending = false;
  state.username = '';
  state.chats = {};
  state.senders = {};
  state.error = '';
}
function waitOnChats() {
  state.chats = {};
  state.senders = {};
  state.isChatPending = true;
  state.error = '';
}
function setChats(chats, senders) {
  state.chats = chats;
  state.senders = senders;
  state.isChatPending = false;
  state.error = '';
  state.lastAddedChatId = '';
}
function setError(error) {
  console.log(error);
  if (!error) {
    state.error = '';
    return;
  }
  state.error = _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES[error] || _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES["default"];
}
function addChat(_ref) {
  var id = _ref.id,
    chat = _ref.chat,
    name = _ref.name,
    sender = _ref.sender;
  state.chats[id] = chat;
  state.senders[name] = sender;
  state.lastAddedChatId = id;
  state.error = '';
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

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
/*!**********************!*\
  !*** ./src/chats.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _renderMessage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./renderMessage */ "./src/renderMessage.js");
/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./listeners */ "./src/listeners.js");







//This is where someone new to the code will see what happens on load
var appEl = document.querySelector('#app');
(0,_render__WEBPACK_IMPORTED_MODULE_3__.render)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_5__.addAbilityToLogin)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_5__.addAbilityToLogout)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_5__.addAbilityToAddChat)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
checkForSession();
pollChats();
function checkForSession() {
  (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchSession)().then(function (session) {
    // The returned object from the service call
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.login)(session.username); // We do not have todos yet!
    (0,_render__WEBPACK_IMPORTED_MODULE_3__.render)({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    }); // Show we are logged in but don't have todos
    return (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchChat)(); // By returning this promise we can chain the original promise
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_0__.SERVER.AUTH_MISSING) {
      return Promise.reject({
        error: _constants__WEBPACK_IMPORTED_MODULE_0__.CLIENT.NO_SESSION
      }); // Expected, not a problem
    }

    return Promise.reject(err); // Pass any other error unchanged
  }).then(function (chats) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setChats)(chats.messageLists, chats.senderLists);
    (0,_render__WEBPACK_IMPORTED_MODULE_3__.render)({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) == _constants__WEBPACK_IMPORTED_MODULE_0__.CLIENT.NO_SESSION) {
      // expected "error"
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)(); // No longer waiting, set to logged out case
      (0,_render__WEBPACK_IMPORTED_MODULE_3__.render)({
        state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
        appEl: appEl
      });
      return;
    }
    // For unexpected errors, report them
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR'); // Ensure that the error ends up truthy
    (0,_render__WEBPACK_IMPORTED_MODULE_3__.render)({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
  });
}
function refreshChats() {
  (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchChat)().then(function (chats) {
    var updatesElement = document.querySelector('.user-list');
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setChats)(chats.messageLists, chats.senderLists);
    (0,_renderMessage__WEBPACK_IMPORTED_MODULE_4__.renderMessage)({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      updatesElement: updatesElement
    });
    console.log("refreshed");
  });
}
function pollChats() {
  refreshChats(); // fetch and use data
  setTimeout(pollChats, 3500);
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map