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



class FpCookie {
  static STORE = '__fp_store';
  /**
   * Store a cookie
   * @param {string} name
   * @param {any} value
   */

  static set(name, value) {
    const store = this.store;
    store[name] = value;
    js_cookie__WEBPACK_IMPORTED_MODULE_0__["default"].set(this.STORE, store, {
      secure: true,
      sameSite: 'strict'
    });
  }
  /**
   * Return a cookie from store
   * @param {string} name
   * @returns {any}
   */


  static get(name) {
    return this.store?.[name];
  }
  /**
   * Delete a cookie
   * @param {string} name
   */


  static clear() {
    js_cookie__WEBPACK_IMPORTED_MODULE_0__["default"].remove(this.STORE);
  }

  static get store() {
    return js_cookie__WEBPACK_IMPORTED_MODULE_0__["default"].get(this.STORE) || {};
  }

}
/**
 * Read all fp-ccokie inputs on form and store in a cookie
 *
 * @param {HTMLFormElement} form
 */


const cookiesLoad = form => {
  // Read all inputs submited
  form.querySelectorAll('input[data-fp-cookie]').forEach(
  /**
   * @type {HTMLInputElement}
   */
  input => {
    const cookieName = input.getAttribute('data-fp-cookie');
    const value = _lib_dom__WEBPACK_IMPORTED_MODULE_1__["default"].input.getValue(input);
    FpCookie.set(cookieName, value);
  });
};
/**
 * Retrieve stored cookies and write into data-fp-cookie tagged elements
 */


const cookiesUnload = () => {
  _lib_dom__WEBPACK_IMPORTED_MODULE_1__["default"].qall('[data-fp-cookie]').forEach(
  /**
   * @param {HTMLElement} elem
   */
  elem => {
    const cookieName = elem.getAttribute('data-fp-cookie');
    const value = FpCookie.get(cookieName);
    value && _lib_dom__WEBPACK_IMPORTED_MODULE_1__["default"].setValue(elem, value);
  });
};
/**
 * Store all submited input with data-fp-cookie attribute
 *
 * @param {Event} event
 */


const onSubmit = event => {
  // Submitter is the input button type=submit
  cookiesLoad(event.submitter.form); // Also update existing elements

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
    f.addEventListener('submit', onSubmit);
  });
  cookiesUnload();
};

window.addEventListener('load', onLoad);

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
  const params = new URLSearchParams(location.search || location.hash.split('?')?.[1]);
  params.forEach((value, key) => {
    /**
     * @type {HTMLInputElement}
     */
    const input = _lib_dom__WEBPACK_IMPORTED_MODULE_0__["default"].q(`input[data-fp-param="${key}"]`);
    _lib_dom__WEBPACK_IMPORTED_MODULE_0__["default"].input.setValue(input, value);
  });
};

window.addEventListener('hashchange', onHashChange);
window.addEventListener('load', onHashChange);

/***/ }),

/***/ "./src/components/validation.js":
/*!**************************************!*\
  !*** ./src/components/validation.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/dom */ "./src/lib/dom.js");

/**
 * Slice input if maxlength is reached
 *
 * @param {InputEvent} e
 */

const maxLength = e => {
  const input = e.target;
  const {
    value
  } = input;
  const {
    maxLength: max
  } = input;
  if (value > max) input.value = value.slice(0, max);
};
/**
 * Remove all input that does not match inputMode
 *
 * @param {InputEvent} e
 */


const inputMode = e => {
  const input = e.target;
  const {
    value
  } = input;

  switch (input.inputMode) {
    case 'numeric':
      input.value = value.replace(/\D/g, '');
      break;

    default:
      break;
  }
};
/**
 * Add event listners for input fields with
 * data-fp-validation
 *
 * Possible values
 *  maxlength: will strip input if maxlength is reached
 *  inputmode: will only allow input of type specified on inputmode
 */


const setupWatchers = () => {
  /**
   * Setup watcher for input
   *
   * @param {HTMLInputElement} input
   */
  const setupInput = input => {
    const validations = input.getAttribute('data-fp-validation')?.split(','); // Only setup if dependend attribute is found

    validations.forEach(v => {
      const validators = {
        maxlength: maxLength,
        inputmode: inputMode
      };
      input.getAttribute(v) && input.addEventListener('input', validators[v], true);
    });
  };

  _lib_dom__WEBPACK_IMPORTED_MODULE_0__["default"].qall('input[data-fp-validation]').forEach(input => setupInput(input));
};

window.addEventListener('load', setupWatchers);

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

    switch (elem.tagName) {
      case 'INPUT':
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
          input.checked = false;
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
          return this.radio.getValue(input.name);

        case 'checkbox':
          return input.checked;

        default:
          return input.value;
      }
    }

    static radio = class {
      /**
       * Check a value in a radio button group
       * For some wierd reason click() does not add decoration to input as if it was
       * clicked
       *
       * @param {string} radioName
       * @param {string} value
       */
      static setValue(radioName, value) {
        const radio = Dom.q(`input[name="${radioName}"][value="${value}"]`);
        radio.checked &&= false; // Voodoo to make the click also apply the correct classes

        setTimeout(() => radio?.click(), 300);
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

/***/ "./node_modules/js-cookie/dist/js.cookie.mjs":
/*!***************************************************!*\
  !*** ./node_modules/js-cookie/dist/js.cookie.mjs ***!
  \***************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/*! js-cookie v3.0.1 | MIT */
/* eslint-disable no-var */
function assign (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      target[key] = source[key];
    }
  }
  return target
}
/* eslint-enable no-var */

/* eslint-disable no-var */
var defaultConverter = {
  read: function (value) {
    if (value[0] === '"') {
      value = value.slice(1, -1);
    }
    return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
  },
  write: function (value) {
    return encodeURIComponent(value).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent
    )
  }
};
/* eslint-enable no-var */

/* eslint-disable no-var */

function init (converter, defaultAttributes) {
  function set (key, value, attributes) {
    if (typeof document === 'undefined') {
      return
    }

    attributes = assign({}, defaultAttributes, attributes);

    if (typeof attributes.expires === 'number') {
      attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
    }
    if (attributes.expires) {
      attributes.expires = attributes.expires.toUTCString();
    }

    key = encodeURIComponent(key)
      .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
      .replace(/[()]/g, escape);

    var stringifiedAttributes = '';
    for (var attributeName in attributes) {
      if (!attributes[attributeName]) {
        continue
      }

      stringifiedAttributes += '; ' + attributeName;

      if (attributes[attributeName] === true) {
        continue
      }

      // Considers RFC 6265 section 5.2:
      // ...
      // 3.  If the remaining unparsed-attributes contains a %x3B (";")
      //     character:
      // Consume the characters of the unparsed-attributes up to,
      // not including, the first %x3B (";") character.
      // ...
      stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
    }

    return (document.cookie =
      key + '=' + converter.write(value, key) + stringifiedAttributes)
  }

  function get (key) {
    if (typeof document === 'undefined' || (arguments.length && !key)) {
      return
    }

    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all.
    var cookies = document.cookie ? document.cookie.split('; ') : [];
    var jar = {};
    for (var i = 0; i < cookies.length; i++) {
      var parts = cookies[i].split('=');
      var value = parts.slice(1).join('=');

      try {
        var foundKey = decodeURIComponent(parts[0]);
        jar[foundKey] = converter.read(value, foundKey);

        if (key === foundKey) {
          break
        }
      } catch (e) {}
    }

    return key ? jar[key] : jar
  }

  return Object.create(
    {
      set: set,
      get: get,
      remove: function (key, attributes) {
        set(
          key,
          '',
          assign({}, attributes, {
            expires: -1
          })
        );
      },
      withAttributes: function (attributes) {
        return init(this.converter, assign({}, this.attributes, attributes))
      },
      withConverter: function (converter) {
        return init(assign({}, this.converter, converter), this.attributes)
      }
    },
    {
      attributes: { value: Object.freeze(defaultAttributes) },
      converter: { value: Object.freeze(converter) }
    }
  )
}

var api = init(defaultConverter, { path: '/' });
/* eslint-enable no-var */

/* harmony default export */ __webpack_exports__["default"] = (api);


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
/* harmony import */ var _components_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/cookie */ "./src/components/cookie.js");
/* harmony import */ var _components_params__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/params */ "./src/components/params.js");
/* harmony import */ var _components_validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/validation */ "./src/components/validation.js");



}();
/******/ })()
;
//# sourceMappingURL=fp.bundle.js.map