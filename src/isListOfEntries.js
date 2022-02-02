import isArray from 'lodash/isArray'

import isEntry from './isEntry'

// Detect reference list field
// NOTE: this cannot tell you if an empty array should be a list of entries or not
export default (value) => {
  return isArray(value) && value.length && isEntry(value[0])
}
