import dom from '../lib/dom'

/**
 * Handles URL changes
 * Set parameters in input fields with attributes
 * fp-param : paramName
 *
 * Ex: acme.con/food?include-cat=true
 * It will search for an input field with attribute fp-param = include-cat
 * and set its value to true
 *
 * @param {string} newURL New hash URL
 */
const onHashChange = newURL => {
    const url = new URL(newURL)
    const params = new URLSearchParams(url.search)

    params.forEach((value, key) => {
        /**
         * @type {HTMLInputElement}
         */
        const input = dom.q(`input[fp-param="${key}"]`)
        if (input.type !== 'radio') input.value = value
        else {
            // Find the radio with value to be checked
            const radio = dom.q(`input[fp-param="${key}"][value="${value}"]`)
            radio.click()
        }
    })
}

window.onhashchange = onHashChange
