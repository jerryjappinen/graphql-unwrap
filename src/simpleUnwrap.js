import isArray from 'lodash/isArray'

import unwrapEntry from './unwrapEntry'
import unwrapEntryList from './unwrapEntryList'

// This will only return entries by id, not the ordered IDs of the response
export default (listOrObject) => {
  if (isArray(listOrObject)) {
    return unwrapEntryList(listOrObject)
  }

  return unwrapEntry(listOrObject)
}
