# Faux-pas Webflow package

## URL Parameters `fp-param`

Set parameters in input fields with attributes
`fp-param :"paramName"`

Example: `acme.con/food?include-cat=true`
It will search for an input field with attribute `fp-param = "include-cat"`
and set its value to `true`

### Radio buttons

For radio buttons, the URL paramater should be the group `name` and an action `click` will be triggered in order for UI also be updated.

```
# acme.com/service?drone=louie

<body>
    <p>Select a maintenance drone:</p>
    <input type="radio" id="huey" name="drone" value="huey" fp-param="drone">
    <input type="radio" id="dewey" name="drone" value="dewey" fp-param="drone">
    <input type="radio" id="louie" name="drone" value="louie" fp-param="drone"> // Will be checked
</body>
```

## Cookies `fp-cookie`

Stores a cookie on input field when a form is submited and write its value when a page load, on input fields or as `htmlText` in other fields.
