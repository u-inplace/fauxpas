/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_params__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/params */ "./src/components/params.js");

}();
/******/ })()
;
//# sourceMappingURL=fp.bundle.js.map