var React = require('react')
var ReactDOM = require('react-dom')

module.exports = function AutoScroll (options) {
  var property = options.property

  return function (Component) {
    var displayName = Component.displayName || Component.name || 'Component'

    var propTypes = {}
    propTypes[property] = React.PropTypes.any

    var AutoScrollComponent = React.createClass({
      componentDidMount: function componentDidMount () {
        var node = this._node
        node.scrollTop = node.scrollHeight
        this._shouldScroll = false
      },

      componentDidUpdate: function componentDidUpdate (prevProps) {
        if (this._shouldScroll) {
          var node = this._node
          node.scrollTop = node.scrollHeight
          this._shouldScroll = false
        }
      },

      componentWillUpdate: function componentWillUpdate (nextProps) {
        if (this.props[property] !== nextProps[property]) {
          var node = this._node
          this._shouldScroll = node.scrollTop + node.offsetHeight === node.scrollHeight
        }
      },

      displayName: 'AutoScroll(' + displayName + ')',

      propTypes: propTypes,

      render: function render () {
        var props = Object.assign({ ref: this._setComponent }, this.props)
        return React.createElement(Component, props)
      },

      _setComponent: function _setComponent (component) {
        this._component = component
        this._node = ReactDOM.findDOMNode(component)
      }
    })

    return AutoScrollComponent
  }
}
