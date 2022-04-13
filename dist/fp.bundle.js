/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/cookie.js":
/*!**********************************!*\
  !*** ./src/components/cookie.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! js-cookie */ "./node_modules/js-cookie/dist/js.cookie.mjs");
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/dom */ "./src/lib/dom.js");


/**
 * Read all fp-ccokie inputs on form and store in a cookie
 *
 * @param {HTMLFormElement} form
 */

const cookiesLoad = form => {
  // Read all inputs submited
  form.querySelectorAll('input[fp-cookie]').forEach(
  /**
   * @type {HTMLInputElement}
   */
  input => {
    const cookieName = input.getAttribute('fp-cookie');
    const value = _lib_dom__WEBPACK_IMPORTED_MODULE_1__["default"].input.getValue(input);
    js_cookie__WEBPACK_IMPORTED_MODULE_0__["default"].set(cookieName, value);
  });
};
/**
 * Retrieve stored cookies and write into fp-cookie tagged elements
 */


const cookiesUnload = () => {
  _lib_dom__WEBPACK_IMPORTED_MODULE_1__["default"].qall('[fp-cookie]').forEach(
  /**
   * @param {HTMLElement} elem
   */
  elem => {
    const cookieName = elem.getAttribute('fp-cookie');
    const value = js_cookie__WEBPACK_IMPORTED_MODULE_0__["default"].get(cookieName);
    _lib_dom__WEBPACK_IMPORTED_MODULE_1__["default"].setValue(elem, value);
  });
};
/**
 * Store all submited input with fp-cookie attribute
 *
 * @param {Event} event
 */


const onSubmit = event => {
  cookiesLoad(event.submitter); // Also update existing elements

  cookiesUnload();
};
/**
 * Load cookies into variables and load set them
 * whenever a form is submited
 */


const onLoad = () => {
  // Create listener to all forms
  _lib_dom__WEBPACK_IMPORTED_MODULE_1__["default"].qall('form').forEach(f => {
    // eslint-disable-next-line no-param-reassign
    f.onsubmit = onSubmit;
  });
  cookiesUnload();
};

window.onload = onLoad;

/***/ }),

/***/ "./src/components/params.js":
/*!**********************************!*\
  !*** ./src/components/params.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/dom */ "./src/lib/dom.js");

/**
 * Handles URL changes
 * Set parameters in input fields with attributes
 * fp-param : paramName
 *
 * Ex: acme.con/food?include-cat=true
 * It will search for an input field with attribute fp-param = include-cat
 * and set its value to true
 */

const onHashChange = () => {
  // Split to remove # from location.hash
  // eslint-disable-next-line no-restricted-globals
  const params = new URLSearchParams(location.hash.split('?')?.[1]);
  params.forEach((value, key) => {
    /**
     * @type {HTMLInputElement}
     */
    const input = _lib_dom__WEBPACK_IMPORTED_MODULE_0__["default"].q(`input[fp-param="${key}"]`);
    _lib_dom__WEBPACK_IMPORTED_MODULE_0__["default"].input.setValue(input, value);
  });
};

window.onhashchange = onHashChange;

/***/ }),

/***/ "./src/lib/dom.js":
/*!************************!*\
  !*** ./src/lib/dom.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* eslint-disable no-param-reassign */

/**
 * Dom related methods
 */
class Dom {
  /**
   * Query selector
   *
   * @param {string} query Dom query string
   * @returns {Element}
   */
  static q(query) {
    return document.querySelector(query);
  }
  /**
   * Query selector all
   *
   * @param {string} query Dom query string
   * @returns {NodeList}
   */


  static qall(query) {
    return document.querySelectorAll(query);
  }
  /**
   * Updates a HTML element value or text
   *
   * @param {HTMLElement} elem
   * @param {*} value
   */


  static setValue(elem, value) {
    if (!elem) return;

    switch (elem.type) {
      case 'input':
        this.input.setValue(elem, value);
        break;

      default:
        elem.innerText = value;
        break;
    }
  }

  static input = class {
    /**
     * Set value on input field. Handles checkbox and radio
     * buttons with click instead of updating value only
     *
     * @param {HTMLInputElement} input
     * @param {any} value
     */
    static setValue(input, value) {
      if (!input) return;

      switch (input.type) {
        case 'radio':
          // Find the element to be checked within the same radio group name
          this.radio.setValue(input.name, value);
          break;

        case 'checkbox':
          input.click();
          break;

        default:
          input.value = value;
          break;
      }
    }
    /**
     * Get value from HTML input element
     *
     * @param {HTMLElement} input
     * @returns {any}
     */
    // eslint-disable-next-line consistent-return


    static getValue(input) {
      if (input) switch (input.type) {
        case 'radio':
          return this.radio.getValue(input);

        case 'checkbox':
          return input.checked;

        default:
          return input.value;
      }
    }

    static radio = class {
      /**
       * Check a value in a radio button group
       *
       * @param {string} radioName
       * @param {string} value
       */
      static setValue(radioName, value) {
        const radio = Dom.q(`input[name="${radioName}"][value="${value}"]`);
        radio.click();
      }

      static getValue(radioName) {
        return Dom.q(`input[name="${radioName}"]:checked`)?.value;
      }

    };
  };
}

const dom = Dom;
/* harmony default export */ __webpack_exports__["default"] = (dom);

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/cookie */ "./src/components/cookie.js");
/* harmony import */ var _components_params__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/params */ "./src/components/params.js");



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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"fp": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkfauxpas"] = self["webpackChunkfauxpas"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], function() { return __webpack_require__("./src/main.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=fp.bundle.js.map