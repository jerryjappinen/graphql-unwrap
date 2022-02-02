import isString from 'lodash/isString'

const trimAllWhitespace = (string) => {
  return string.replace(/\s/g, '')
}

expect.extend({
  // @ts-ignore
  toBeNonEmptyString (received) {
    return {
      pass: !!(received && isString(received) && trimAllWhitespace(received).length),
      message: received + ' is empty or not a string'
    }
  }
})
