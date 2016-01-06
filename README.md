# react-auto-scroll

A HOC that will auto-scroll to the bottom when a property changes.

It'll track a property and scroll to the bottom whenever it changes. If the user has scrolled up, it preserves the user's scroll position when the property changes.

## Installation

```sh
$ npm i react-auto-scroll
```

## Example

```js
var React = require('react')
var AutoScroll = require('react-auto-scroll')
var Component = AutoScroll({
  property: 'propertyName'
})(React.createClass(/* ... */))
```

## API

* `AutoScroll(options)(Component)`

* `options.property` (string) Property to track for scrolling

## License

MIT
