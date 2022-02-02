"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _map = _interopRequireDefault(require("lodash/map"));

var _merge = _interopRequireDefault(require("lodash/merge"));

var _isEntry = _interopRequireDefault(require("./isEntry"));

var _isListOfEntries = _interopRequireDefault(require("./isListOfEntries"));

var _unwrapEntryList = _interopRequireDefault(require("./unwrapEntryList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Takes in one data object with potentially nested objects
// Returns a flat map of entries, where every object is keyed by their ID
// Throws an error, if ID or __typename is missing
var unwrapEntry = originalEntryData => {
  if (!originalEntryData.id || !originalEntryData.__typename) {
    throw new Error('unwrapEntry requires ID and __typename for all objects');
  } // 1. Naively pick all fields from root object as-is


  var entriesById = {};

  var mainEntry = _objectSpread({}, originalEntryData); // 2. Find potential nested entries in data


  for (var fieldName in mainEntry) {
    if (Object.hasOwnProperty.call(mainEntry, fieldName)) {
      var field = mainEntry[fieldName]; // 2.1 Nested reference

      if ((0, _isEntry.default)(field)) {
        // 2.1. Keep ID of nested object in field
        // NOTE: if ID is missing, we'll get an error in the next step, so we won't bother checking
        mainEntry[fieldName] = field.id; // 2.2. Move actual nested object data into entry map

        entriesById = (0, _merge.default)({}, entriesById, unwrapEntry(field)); // 2.2 Nested reference list
      } else if ((0, _isListOfEntries.default)(field)) {
        // 2.1. Keep IDs of nested objects in field
        // NOTE: if IDs are missing, we'll get errors in the next step, so we won't bother checking
        mainEntry[fieldName] = (0, _map.default)(field, 'id'); // 2.2. Move actual nested object data into entry map

        entriesById = (0, _merge.default)({}, entriesById, (0, _unwrapEntryList.default)(field));
      }
    }
  } // Add main-level entry to the full list


  entriesById[mainEntry.id] = mainEntry;
  return entriesById;
};

var _default = unwrapEntry;
exports.default = _default;