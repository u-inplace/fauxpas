# Faux-pas Webflow package

## URL Parameters `data-fp-param`

Set parameters in input fields with attributes
`data-fp-param :"paramName"`

Example: `acme.con/food?include-cat=true`
It will search for an input field with attribute `data-fp-param = "include-cat"`
and set its value to `true`

### Radio buttons

For radio buttons, the URL paramater should be the group `name` and an action `click` will be triggered in order for UI also be updated.

```
# acme.com/service?drone=louie

<body>
    <p>Select a maintenance drone:</p>
    <input type="radio" id="huey" name="drone" value="huey" data-fp-param="drone">
    <input type="radio" id="dewey" name="drone" value="dewey" data-fp-param="drone">
    <input type="radio" id="louie" name="drone" value="louie" data-fp-param="drone"> // Will be checked
</body>
```

## Cookies `data-fp-cookie`

Stores a cookie on input field when a form is submited and write its value when a page load, on input fields or as `htmlText` in other fields.

## Validation `data-fp-validation`

**`maxlength`**

Strip input if maxlength attribute is reached

```
<input
    id="phone"
    type="number"
    maxlength="12"
    data-fp-validation="maxlength" />
```

**`inputmode`**

Remove all input that does not match inputMode.
Ony works with `inputMode="number"`

```
<input
    id="phone"
    type="number"
    maxlength="12"
    inputmode="number"
    data-fp-validation="maxlength,inputmode"  />
```
