import isPlainObject from 'lodash/isPlainObject'
import merge from 'lodash/merge'

import unwrap from './unwrap'

// GraphQL responses are usually returned keyed by the name of the endpoint or query
// Pass the entire response to this method to get the results unwrapped from each endpoint
export default (responsesByEndpoint, keys) => {
  let entries = {}
  const idsByEndpoint = {}

  // Pick all keys by default, unless otherwise specified
  const keysToPick = isPlainObject(keys) ? keys : Object.keys(responsesByEndpoint)

  // Iterate through each endpoint that we wanted
  for (let i = 0; i < keysToPick.length; i++) {
    const responseEndpoint = keysToPick[i]
    const [endpointEntries, endpointIds] = unwrap(responsesByEndpoint[responseEndpoint])

    // Store new data
    entries = merge({}, entries, endpointEntries)

    // Return IDs for this endpoint
    idsByEndpoint[responseEndpoint] = endpointIds
  }

  // Return one unified `entries`, and a list of `IDs` per endpoint
  return [entries, idsByEndpoint]
}
