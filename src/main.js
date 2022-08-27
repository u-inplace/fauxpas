/* eslint-disable */
import FpCookies from './components/cookie'
import FpParams from './components/params'
import FpValidation from './components/validation'

// Wait for DOM to load before query elements
document.addEventListener('DOMContentLoaded', () => {
    FpParams()
    FpCookies()
    FpValidation()
})
