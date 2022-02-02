import unwrap from './unwrap'
import unwrapAll from './unwrapAll'

export default (listOrObject, endpointKeys) => {
  if (endpointKeys) {
    return unwrapAll(listOrObject, endpointKeys)
  }

  return unwrap(listOrObject)
}
