import Cookies from 'js-cookie'
import dom from '../lib/dom'

Cookies.withAttributes({ secure: true, sameSite: 'strict' })

class FpCookie {
    static STORE = '__fp_store'

    /**
     * Static initializer
     * Not support in webpack terser yet
     * https://github.com/terser/terser/issues/1093
     * 
    static {
        Cookies.withAttributes({ path: '/', secure: true, sameSite: 'strict' })
    }
     */

    /**
     * Store a cookie
     *
     * @param {string} name
     * @param {any} value
     */
    static set(name, value) {
        const { store } = this
        store[name] = value
        Cookies.set(this.STORE, JSON.stringify(store), { secure: true, sameSite: 'strict' })
    }

    /**
     * Return a cookie from store
     *
     * @param {string} name
     * @returns {any}
     */
    static get(name) {
        return this.store?.[name]
    }

    /**
     * Delete a cookie
     */
    static clear() {
        Cookies.remove(this.STORE, { secure: true, sameSite: 'strict' })
    }

    static get store() {
        const store = Cookies.get(this.STORE)
        return store ? JSON.parse(store) : {}
    }

    static get isEmpty() {
        const { store } = this

        return Object.keys(store) === 0
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
            const cookieName = input.getAttribute('data-fp-cookie')
            const value = dom.input.getValue(input)
            FpCookie.set(cookieName, value)
        }
    )
}

/**
 * Retrieve stored cookies and write into data-fp-cookie tagged elements
 */
const cookiesUnload = () => {
    dom.qall('[data-fp-cookie]').forEach(
        /**
         * @param {HTMLElement} elem
         */
        elem => {
            const cookieName = elem.getAttribute('data-fp-cookie')
            const value = FpCookie.get(cookieName)
            value && dom.setValue(elem, value)
        }
    )
}

/**
 * Store all submited input with data-fp-cookie attribute
 *
 * @param {Event} event
 */
const onSubmit = event => {
    // Submitter is the input button type=submit
    cookiesLoad(event.submitter.form)

    // Also update existing elements
    // FIXME: does not work
    // cookiesUnload()
}

const FpCookies = () => {
    /**
     * Load cookies into variables and load set them
     * whenever a form is submited
     */
    dom.qall('form').forEach(f => {
        // eslint-disable-next-line no-param-reassign
        f.addEventListener('submit', onSubmit, true)
    })

    // Unloads if store is not empty
    // Otherwise, will try to load current values at page load
    // Combo with FpParams
    if (FpCookie.isEmpty) cookiesLoad()
    else cookiesUnload()

    // Makes FpCookie available
    window.FpCookie = FpCookie
}

export default FpCookies
