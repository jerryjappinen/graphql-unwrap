import get from 'lodash/get'
import isArray from 'lodash/isArray'
import merge from 'lodash/merge'

import treatOptions from './treatOptions'
import unwrapOne from './unwrapOne'

export { unwrapOne }

// GraphQL responses are usually returned keyed by the name of the endpoint or query
// Pass the entire response to this method to get the results unwrapped from each endpoint
export const unwrap = (responsesByEndpoint, options) => {
  const { itemsPath } = treatOptions(options)

  let entries = {}
  const idsByEndpoint = {}

  // Pick all keys by default, unless otherwise specified
  const keysToPick = isArray(options)
    ? options
    : options && options.keys && isArray(options.keys)
      ? options.keys
      : Object.keys(responsesByEndpoint)

  // Iterate through each endpoint that we wanted
  for (let i = 0; i < keysToPick.length; i++) {
    const responseEndpoint = keysToPick[i]
    const items = itemsPath ? get(responsesByEndpoint[responseEndpoint], itemsPath) : responsesByEndpoint[responseEndpoint]
    const [endpointEntries, endpointIds] = unwrapOne(items, options)

    // Store new data
    entries = merge({}, entries, endpointEntries)

    // Return IDs for this endpoint
    idsByEndpoint[responseEndpoint] = endpointIds
  }

  // Return one unified `entries`, and a list of `IDs` per endpoint
  return [entries, idsByEndpoint]
}

export default unwrap
