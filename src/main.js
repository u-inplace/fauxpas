/* eslint-disable */
import FpCookies from './components/cookie'
import FpParams from './components/params'
import FpValidation from './components/validation'

const init = () => {
    console.log('Fp: DOMContentLoaded')
    FpParams()
    FpCookies()
    FpValidation()
}

// Wait for DOM to load before query elements
// It's possible that DOMContent is already loaded, so check on document.readState
if (document.readyState !== 'loading') init()
else document.addEventListener('DOMContentLoaded', init)
