import unwrapEndpoint from './unwrapEndpoint'
import unwrapEach from './unwrapEach'

export default (listOrObject, endpointKeys) => {
  // Unwrap as a single endpoint by setting the second parameter to false
  if (endpointKeys === false) {
    return unwrapEndpoint(listOrObject)
  }

  return unwrapEach(listOrObject, endpointKeys)
}
