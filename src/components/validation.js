import dom from '../lib/dom'

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
    /**
     * Setup watcher for input
     *
     * @param {HTMLInputElement} input
     */
    const setupInput = input => {
        const validations = input.getAttribute('data-fp-validation')?.split(',')

        // Only setup if dependend attribute is found
        validations.forEach(v => {
            const validators = {
                maxlength: maxLength,
                inputmode: inputMode
            }

            input.getAttribute(v) && input.addEventListener('input', validators[v])
        })
    }

    dom.qall('input[data-fp-validation]').forEach(input => setupInput(input))
}

window.addEventListener('load', setupWatchers)
