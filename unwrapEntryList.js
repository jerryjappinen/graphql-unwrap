"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _merge = _interopRequireDefault(require("lodash/merge"));

var _unwrapEntry = _interopRequireDefault(require("./unwrapEntry"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Unwraps list of entries, combines into one entry list by ID
var _default = entryList => {
  var entriesById = {};
  entryList.forEach(entryData => {
    entriesById = (0, _merge.default)({}, entriesById, (0, _unwrapEntry.default)(entryData));
  });
  return entriesById;
};

exports.default = _default;