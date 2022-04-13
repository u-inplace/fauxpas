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
        return document.querySelector(query)
    }

    /**
     * Query selector all
     *
     * @param {string} query Dom query string
     * @returns {NodeList}
     */
    static qall(query) {
        return document.querySelectorAll(query)
    }

    /**
     * Updates a HTML element value or text
     *
     * @param {HTMLElement} elem
     * @param {*} value
     */
    static setValue(elem, value) {
        if (!elem) return

        switch (elem.type) {
            case 'input':
                this.input.setValue(elem, value)
                break

            default:
                elem.innerText = value
                break
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
            if (!input) return

            switch (input.type) {
                case 'radio':
                    // Find the element to be checked within the same radio group name
                    this.radio.setValue(input.name, value)
                    break
                case 'checkbox':
                    input.checked = false
                    input.click()
                    break
                default:
                    input.value = value
                    break
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
            if (input)
                switch (input.type) {
                    case 'radio':
                        return this.radio.getValue(input)
                    case 'checkbox':
                        return input.checked
                    default:
                        return input.value
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
                const radio = Dom.q(`input[name="${radioName}"][value="${value}"]`)
                radio.checked &&= false

                setTimeout(() => radio?.click(), 300)
            }

            static getValue(radioName) {
                return Dom.q(`input[name="${radioName}"]:checked`)?.value
            }
        }
    }
}

const dom = Dom

export default dom
