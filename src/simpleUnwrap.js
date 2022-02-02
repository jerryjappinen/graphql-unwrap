import isArray from 'lodash/isArray'

import unwrapEntry from './unwrapEntry'
import unwrapEntryList from './unwrapEntryList'

export default (listOrObject) => {
  if (isArray(listOrObject)) {
    return unwrapEntryList(listOrObject)
  }

  return unwrapEntry(listOrObject)
}
