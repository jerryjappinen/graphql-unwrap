import get from 'lodash-es/get'
import isPlainObject from 'lodash-es/isPlainObject'
import map from 'lodash-es/map'
import merge from 'lodash-es/merge'

import isEntry from './isEntry'
import isListOfEntries from './isListOfEntries'
import isRichTextField from './isRichTextField'
import unwrapEntryList from './unwrapEntryList'
import treatOptions from './treatOptions'

// Takes in one data object with potentially nested objects
// Returns a flat map of entries, where every object is keyed by their ID
// Throws an error, if ID or type is missing
const unwrapEntry = (originalEntryData, options) => {
  const { idKey, itemsPath, typeKey, richTextReferencesPath } = treatOptions(options)

  if (!originalEntryData[idKey] || !originalEntryData[typeKey]) {
    throw new Error(`unwrapEntry requires "${idKey}" and "${typeKey}" for all objects (${JSON.stringify(originalEntryData)})`)
  }

  // 1. Naively pick all fields from root object as-is
  let entriesById = {}
  const mainEntry = {
    ...originalEntryData
  }

  // 2. Iterate through each field to find potential nested entries in data
  for (const fieldName in mainEntry) {
    if (Object.hasOwnProperty.call(mainEntry, fieldName)) {
      const field = mainEntry[fieldName]

      // 2.1 Nested reference
      if (isEntry(field, options)) {
        // 2.1.1 Keep ID of nested object in field
        // NOTE: if ID is missing, we'll get an error in the next step, so we won't bother checking
        mainEntry[fieldName] = field[idKey]

        // 2.2.2 Move actual nested object data into entry map
        entriesById = merge(
          {},
          entriesById,
          unwrapEntry(field, options)
        )

      // 2.2.3 Field is not entry, but it might be a rich text field
      } else if (richTextReferencesPath && isRichTextField(field, options)) {
        // Unwrap all entries nested as rich text references
        entriesById = merge(
          {},
          entriesById,
          unwrapEntryList(field[richTextReferencesPath], options)
        )

      // 2.3 Nested reference list
      } else {
        const potentialList = itemsPath && isPlainObject(field)
          ? get(field, itemsPath)
          : field

        if (isListOfEntries(potentialList, options)) {
          // 2.3.1 Keep IDs of nested objects in field
          // NOTE: if IDs are missing, we'll get errors in the next step, so we won't bother checking
          mainEntry[fieldName] = map(potentialList, idKey)

          // 2.3.2 Move actual nested object data into entry map
          entriesById = merge(
            {},
            entriesById,
            unwrapEntryList(potentialList, options)
          )
        }
      }
    }
  }

  // Add main-level entry to the full list
  entriesById[mainEntry[idKey]] = mainEntry

  return entriesById
}

export { unwrapEntry as default }
