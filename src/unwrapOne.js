import isArray from 'lodash-es/isArray'

import unwrapEntry from './unwrapEntry'
import unwrapEntryList from './unwrapEntryList'

import treatOptions from './treatOptions'

export default (listOrObject, options) => {
  const { idKey } = treatOptions(options)

  if (isArray(listOrObject)) {
    const entries = unwrapEntryList(listOrObject, options)

    // Return data and ordered list of IDs as defined in the original data
    return [
      entries,
      listOrObject.map((entry) => {
        return entry[idKey]
      })
    ]
  }

  // Convert single resource into the same response format
  return [
    unwrapEntry(listOrObject, options),
    [listOrObject[idKey]]
  ]
}
