import Cookies from 'js-cookie'
import dom from '../lib/dom'

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
            Cookies.set(cookieName, value)
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
            const value = Cookies.get(cookieName)
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
    cookiesLoad(event.submitter.parentElement)

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
        f.addEventListener('submit', onSubmit)
    })

    cookiesUnload()
}

window.addEventListener('load', onLoad)
