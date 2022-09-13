import forEach from 'lodash-es/forEach'
import merge from 'lodash-es/merge'

import unwrapEntry from './unwrapEntry'

// Unwraps list of entries, combines into one entry list by ID
export default (entryList, options) => {
  let entriesById = {}

  forEach(entryList, (entryData) => {
    entriesById = merge(
      {},
      entriesById,
      unwrapEntry(entryData, options)
    )
  })

  return entriesById
}
