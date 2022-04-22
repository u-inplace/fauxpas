import Cookies from 'js-cookie'
import dom from '../lib/dom'

class FpCookie {
    static STORE = '__fp_store'

    /**
     * Store a cookie
     * @param {string} name
     * @param {any} value
     */
    static set(name, value) {
        const store = this.store
        store[name] = value
        Cookies.set(this.STORE, store, { secure: true, sameSite: 'strict' })
    }

    /**
     * Return a cookie from store
     * @param {string} name
     * @returns {any}
     */
    static get(name) {
        return this.store?.[name]
    }

    /**
     * Delete a cookie
     * @param {string} name
     */
    static clear() {
        Cookies.remove(this.STORE)
    }

    static get store() {
        return Cookies.get(this.STORE) || {}
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
    cookiesUnload()
}

/**
 * Load cookies into variables and load set them
 * whenever a form is submited
 */
const onLoad = () => {
    // Create listener to all forms
    dom.qall('form').forEach(f => {
        // eslint-disable-next-line no-param-reassign
        f.addEventListener('submit', onSubmit, true)
    })

    cookiesUnload()
}

window.addEventListener('load', onLoad, true)
