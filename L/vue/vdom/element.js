
var _ = require('./util')

/**
 * Virtual-dom Element.
 * @param {String} tagName
 * @param {Object} props - Element's properties,
 *                       - using object to store key-value pair
 * @param {Array<Element|String>} - This element's children elements.
 *                                - Can be Element instance or just a piece plain text.
 */
function Element (tagName, props, children) {
  this.ele = null;
  this.tagName = tagName
  this.props = props || {}
  this.children = children || []
  this.key = props
    ? props.key
    : void 0
}

/**
 * Render the hold element tree.
 */
Element.prototype.render = function () {
  var el = document.createElement(this.tagName)
  var props = this.props

  for (var propName in props) {
    var propValue = props[propName]
    _.setAttr(el, propName, propValue)
  }

  this.children.forEach(child => {
    var childEl = (child instanceof Element)
      ? child.render()
      : document.createTextNode(child)
    el.appendChild(childEl);
  })

  this.ele = el;
  return el
}

Element.prototype.isEqual = function (target) {
    return this.key === target.key 
      && this.tag === target.tag;
}

module.exports = Element