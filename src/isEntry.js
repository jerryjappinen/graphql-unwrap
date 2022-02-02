import isPlainObject from 'lodash/isPlainObject'

// Detect reference field
export default (value) => {
  return isPlainObject(value) && (value.id || value.id === 0) && value.__typename
}
