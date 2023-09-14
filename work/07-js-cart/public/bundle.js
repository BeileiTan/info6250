/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
  PRODUCT: 'product',
  VIEW: 'view'
};
var state = {
  lists: [{
    name: "Tan",
    price: 0.99,
    url: "http://placekitten.com/150/150?image=1",
    qty: 0,
    smallUrl: "http://placekitten.com/30/30?image=1"
  }, {
    name: "Bei",
    price: 3.14,
    url: "http://placekitten.com/150/150?image=2",
    qty: 0,
    smallUrl: "http://placekitten.com/30/30?image=2"
  }, {
    name: "Lei",
    price: 2.73,
    url: "http://placekitten.com/150/150?image=3",
    qty: 0,
    smallUrl: "http://placekitten.com/30/30?image=3"
  }],
  page: PAGES.PRODUCT
};


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
  !*** ./src/demo.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state.js */ "./src/state.js");

(function () {
  var appEl = document.querySelector('#app');
  function render() {
    if (_state_js__WEBPACK_IMPORTED_MODULE_0__.state.page === _state_js__WEBPACK_IMPORTED_MODULE_0__.PAGES.PRODUCT) {
      renderProduct();
      return;
    }
    if (_state_js__WEBPACK_IMPORTED_MODULE_0__.state.page === _state_js__WEBPACK_IMPORTED_MODULE_0__.PAGES.VIEW) {
      renderView();
      return;
    }
  }
  function renderProduct() {
    var productPage = getProductHtml(_state_js__WEBPACK_IMPORTED_MODULE_0__.state.lists);
    var countHtmls = _state_js__WEBPACK_IMPORTED_MODULE_0__.state.lists.filter(filterByQty);
    var count = 0;
    countHtmls.map(function (countHtml) {
      count += Number(countHtml.qty);
    });
    if (countHtmls.length === 0) {
      appEl.innerHTML = "\n            <ul class=\"lists\">\n            ".concat(productPage, "\n            </ul>\n            <button class=\"page\" type=\"button\" data-target=\"view\">View Cart</button>\n            ");
    } else {
      appEl.innerHTML = "\n            <ul class=\"lists\">\n            ".concat(productPage, "\n            </ul>\n            <button class=\"page\" type=\"button\" data-target=\"view\">View Cart (").concat(count, ") </button>\n            ");
    }
  }
  function renderView() {
    var productPage = getProductHtml(_state_js__WEBPACK_IMPORTED_MODULE_0__.state.lists);
    var viewPage = getViewHtml(_state_js__WEBPACK_IMPORTED_MODULE_0__.state.lists);
    var totalSum = getSumHtml(_state_js__WEBPACK_IMPORTED_MODULE_0__.state.lists);
    var nothingHtml = _state_js__WEBPACK_IMPORTED_MODULE_0__.state.lists.filter(filterByQty);
    if (nothingHtml.length === 0) {
      appEl.innerHTML = "\n            <ul class=\"lists\">\n            ".concat(productPage, "\n            </ul>\n            <p> Nothing in the cart </p>\n            ");
    } else {
      appEl.innerHTML = "\n            <ul class=\"lists\">\n            ".concat(productPage, "\n            </ul>\n            <div class=\"view\">\n            ").concat(viewPage, "\n            ").concat(totalSum, "\n            <button class=\"page\" type=\"button\" data-target=\"product\">Hide Cart</button>\n            <button class=\"checkout\" type=\"button\" data-target=\"product\">Checkout</button>\n            </div>\n        ");
    }
  }
  function getProductHtml(lists) {
    var productPage = lists.map(function (list, index) {
      return "\n            <li> \n                <span class=\"list\" data-index=\"".concat(index, "\">\n                    <img src=\"").concat(list.url, "\" alt=\"\" class=\"src\">\n                    Name: ").concat(list.name, " Price: ").concat(list.price, "\n                </span>\n                <button data-index=\"").concat(index, "\" class=\"add\" type=\"button\"> Add to Cart</button>\n            </li>\n            ");
    }).join('');
    return productPage;
  }
  function getSumHtml(lists) {
    var filteredLists = lists.filter(filterByQty);
    var sum = 0;
    filteredLists.map(function (filteredList) {
      sum += Number((filteredList.qty * filteredList.price).toFixed(2));
    });
    var totalSum = "\n        <p> Total cost of all cats: ".concat(sum.toFixed(2), " </p>\n        ");
    return totalSum;
  }
  function filterByQty(lists) {
    if (lists.qty) {
      return true;
    } else {
      return false;
    }
  }
  function getViewHtml(lists) {
    var filteredLists = lists.filter(filterByQty);
    var viewPage = filteredLists.map(function (filteredList) {
      return "\n                <li> \n                    <span class=\"list\">\n                        <img src=\"".concat(filteredList.smallUrl, "\" alt=\"\" class=\"src\">\n                        Name: ").concat(filteredList.name, " Quantity: ").concat(filteredList.qty, " Total Price: ").concat((filteredList.qty * filteredList.price).toFixed(2), "\n                    </span>\n                    <button data-name=\"").concat(filteredList.name, "\" class=\"addOne\" type=\"button\"> Add 1</button>\n                    <button data-name=\"").concat(filteredList.name, "\" class=\"deleteOne\" type=\"button\"> Delete 1</button>\n                </li>\n            ");
    }).join('');
    return viewPage;
  }
  appEl.addEventListener('click', function (e) {
    if (e.target.classList.contains('add')) {
      var index = e.target.dataset.index;
      _state_js__WEBPACK_IMPORTED_MODULE_0__.state.lists[index].qty += 1;
      render();
      return;
    }
    if (e.target.classList.contains('addOne')) {
      var curName = e.target.dataset.name;
      var object = _state_js__WEBPACK_IMPORTED_MODULE_0__.state.lists.find(function (obj) {
        return obj.name === curName;
      });
      object.qty += 1;
      render();
      return;
    }
    if (e.target.classList.contains('deleteOne')) {
      var _curName = e.target.dataset.name;
      var _object = _state_js__WEBPACK_IMPORTED_MODULE_0__.state.lists.find(function (obj) {
        return obj.name === _curName;
      });
      if (_object.qty > 1) {
        _object.qty -= 1;
      }
      render();
      return;
    }
    if (e.target.classList.contains('checkout')) {
      var filteredLists = _state_js__WEBPACK_IMPORTED_MODULE_0__.state.lists.filter(filterByQty);
      filteredLists.map(function (filteredList) {
        filteredList.qty = 0;
      });
      _state_js__WEBPACK_IMPORTED_MODULE_0__.state.page = e.target.dataset.target;
      render();
      return;
    }
    if (e.target.classList.contains('page')) {
      _state_js__WEBPACK_IMPORTED_MODULE_0__.state.page = e.target.dataset.target;
      render();
      return;
    }
  });
  render();
})();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map