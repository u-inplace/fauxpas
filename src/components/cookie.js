import Cookies from 'js-cookie'
import dom from '../lib/dom'

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
            const cookieName = input.getAttribute('fp-cookie')
            const value = dom.input.getValue(input)
            Cookies.set(cookieName, value)
        }
    )
}

/**
 * Retrieve stored cookies and write into fp-cookie tagged elements
 */
const cookiesUnload = () => {
    dom.qall('[fp-cookie]').forEach(
        /**
         * @param {HTMLElement} elem
         */
        elem => {
            const cookieName = elem.getAttribute('fp-cookie')
            const value = Cookies.get(cookieName)
            dom.setValue(elem, value)
        }
    )
}

/**
 * Store all submited input with fp-cookie attribute
 *
 * @param {Event} event
 */
const onSubmit = event => {
    cookiesLoad(event.submitter)

    // Also update existing elements
    cookiesUnload()
}

/**
 * Load cookies into variables and load set them
 * whenever a form is submited
 */
const onLoad = () => {
    console.log('cookie.js onLoad')
    // Create listener to all forms
    dom.qall('form').forEach(f => {
        // eslint-disable-next-line no-param-reassign
        f.onsubmit = onSubmit
    })

    cookiesUnload()
}

console.log('cookie.js before window.onload')
window.onload = onLoad
console.log('cookie.js after window.onload')
