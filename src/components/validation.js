import dom from '../lib/dom'

/**
 * Validations for input fields
 */

/**
 * Slice input if maxlength is reached
 *
 * @param {InputEvent} e
 */
const maxLength = e => {
    const input = e.target
    const { value } = input
    const { maxLength: max } = input
    if (value > max) input.value = value.slice(0, max)
}

/**
 * Remove all input that does not match inputMode
 *
 * @param {InputEvent} e
 */
const inputMode = e => {
    const input = e.target
    const { value } = input

    switch (input.inputMode) {
        case 'number':
            input.value = value.replace(/\D/g, '')
            break
        default:
            break
    }
}

/**
 * Add event listners for input fields with
 * data-fp-validation
 *
 * Possible values
 *  maxlength: will strip input if maxlength is reached
 *  inputmode: will only allow input of type specified on inputmode
 */
const setupWatchers = () => {
    dom.qall('input[data-fp-validation]').forEach(
        /**
         * @type {HTMLInputElement}
         */
        input => {
            const validationType = input.getAttribute('data-fp-validation')
            let validator

            // Only setup if dependend attribute is found
            switch (validationType) {
                case 'maxlength':
                    if (input.getAttribute('maxlength')) validator = maxLength
                    break

                case 'inputmode':
                    if (input.getAttribute('inputmode')) validator = inputMode
                    break
                default:
                    break
            }

            validator && input.addEventListener('input', validator)
        }
    )

    // Split to remove # from location.hash
    // eslint-disable-next-line no-restricted-globals
    const params = new URLSearchParams(location.search || location.hash.split('?')?.[1])

    params.forEach((value, key) => {
        /**
         * @type {HTMLInputElement}
         */
        const input = dom.q(`input[data-fp-param="${key}"]`)
        dom.input.setValue(input, value)
    })
}

window.addEventListener('load', setupWatchers)
