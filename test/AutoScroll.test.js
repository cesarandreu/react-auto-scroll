require('object.assign').shim()
require('phantomjs-polyfill')

var test = require('tape')
var React = require('react')
var ReactDOM = require('react-dom')
var AutoScroll = require('../lib/AutoScroll')

var TestComponent = React.createClass({
  displayName: 'TestComponent',
  propTypes: {
    text: React.PropTypes.string.isRequired
  },
  render: function render () {
    return React.createElement('pre', {
      style: { height: 5, lineHeight: '5px', overflow: 'auto' }
    }, this.props.text)
  }
})

var WrappedTestComponent = AutoScroll({
  property: 'text'
})(TestComponent)

test('AutoScroll renders the wrapped component', function (t) {
  t.plan(2)
  var div = document.createElement('div')
  var instance = ReactDOM.render(
    React.createElement(WrappedTestComponent, {
      text: 'text'
    }),
    div
  )
  var node = ReactDOM.findDOMNode(instance)
  t.equal(node.tagName, 'PRE')
  t.equal(node.textContent, 'text')
})

test('AutoScroll scrolls down when the property changes', function (t) {
  t.plan(2)
  var div = document.createElement('div')
  document.documentElement.appendChild(div)
  var instance = ReactDOM.render(
    React.createElement(WrappedTestComponent, {
      text: 'text\n'
    }),
    div
  )
  var node = ReactDOM.findDOMNode(instance)
  t.equal(node.scrollTop + node.offsetHeight, node.scrollHeight)

  ReactDOM.render(
    React.createElement(WrappedTestComponent, {
      text: 'text\ntext\ntext\ntext\ntext\n'
    }),
    div
  )
  t.equal(node.scrollTop + node.offsetHeight, node.scrollHeight)
  document.documentElement.removeChild(div)
})

test('AutoScroll scrolls to the bottom when first mounted', function (t) {
  t.plan(1)
  var div = document.createElement('div')
  document.documentElement.appendChild(div)
  var instance = ReactDOM.render(
    React.createElement(WrappedTestComponent, {
      text: 'text\ntext\ntext\ntext\ntext\n'
    }),
    div
  )
  var node = ReactDOM.findDOMNode(instance)
  t.equal(node.scrollTop + node.offsetHeight, node.scrollHeight)
  document.documentElement.removeChild(div)
})

test('AutoScroll does nothing when the user has scrolled up', function (t) {
  t.plan(1)
  var div = document.createElement('div')
  document.documentElement.appendChild(div)
  var instance = ReactDOM.render(
    React.createElement(WrappedTestComponent, {
      text: 'text\ntext\ntext\ntext\n'
    }),
    div
  )
  var node = ReactDOM.findDOMNode(instance)
  node.scrollTop = 10
  ReactDOM.render(
    React.createElement(WrappedTestComponent, {
      text: 'text\ntext\ntext\ntext\ntext\ntext\ntext\ntext\n'
    }),
    div
  )
  t.equal(node.scrollTop, 10)
  document.documentElement.removeChild(div)
})
