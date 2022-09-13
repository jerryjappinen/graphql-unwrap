import isPlainObject from 'lodash-es/isPlainObject'

import treatOptions from './treatOptions'

// Detect reference field
export default (value, options) => {
  const { idKey, typeKey } = treatOptions(options)

  return isPlainObject(value) && (value[idKey] || value[idKey] === 0) && value[typeKey]
}
