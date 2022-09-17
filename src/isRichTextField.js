import isArray from 'lodash-es/isArray'
import isPlainObject from 'lodash-es/isPlainObject'

import treatOptions from './treatOptions'

// Detect rich text field
export default (field, options) => {
  const { richTextReferencesPath } = treatOptions(options)

  return !!(isPlainObject(field) && field[richTextReferencesPath] && isArray(field[richTextReferencesPath]))
}
