import dom from '../lib/dom'

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
    const params = new URLSearchParams(location.hash.split('?')?.[1])

    params.forEach((value, key) => {
        /**
         * @type {HTMLInputElement}
         */
        const input = dom.q(`input[fp-param="${key}"]`)
        dom.input.setValue(input, value)
    })
}

document.addEventListener('hashchange', onHashChange)
