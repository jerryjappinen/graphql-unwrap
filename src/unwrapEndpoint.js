import isArray from 'lodash/isArray'

import unwrapEntry from './unwrapEntry'
import unwrapEntryList from './unwrapEntryList'

export default (listOrObject) => {
  if (isArray(listOrObject)) {
    const entries = unwrapEntryList(listOrObject)

    // Return data and ordered list of IDs as defined in the original data
    return [
      entries,
      listOrObject.map((entry) => {
        return entry.id
      })
    ]
  }

  // Convert single resource into the same response format
  return [
    unwrapEntry(listOrObject),
    [listOrObject.id]
  ]
}
