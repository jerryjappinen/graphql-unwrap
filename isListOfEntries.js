"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isArray = _interopRequireDefault(require("lodash/isArray"));

var _isEntry = _interopRequireDefault(require("./isEntry"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Detect reference list field
// NOTE: this cannot tell you if an empty array should be a list of entries or not
var _default = value => {
  return (0, _isArray.default)(value) && value.length && (0, _isEntry.default)(value[0]);
};

exports.default = _default;