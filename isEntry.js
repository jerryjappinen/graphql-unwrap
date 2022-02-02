"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isPlainObject = _interopRequireDefault(require("lodash/isPlainObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Detect reference field
var _default = value => {
  return (0, _isPlainObject.default)(value) && (value.id || value.id === 0) && value.__typename;
};

exports.default = _default;