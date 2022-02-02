"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isArray = _interopRequireDefault(require("lodash/isArray"));

var _unwrapEntry = _interopRequireDefault(require("./unwrapEntry"));

var _unwrapEntryList = _interopRequireDefault(require("./unwrapEntryList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = listOrObject => {
  if ((0, _isArray.default)(listOrObject)) {
    return (0, _unwrapEntryList.default)(listOrObject);
  }

  return (0, _unwrapEntry.default)(listOrObject);
};

exports.default = _default;