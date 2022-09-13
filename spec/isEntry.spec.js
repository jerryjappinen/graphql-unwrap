import { describe, it, expect } from 'vitest'

import isEntry from '../src/isEntry'

describe('isEntry', () => {
  it('should not detect empty values', async () => {
    expect(isEntry({})).toBeFalsy()
    expect(isEntry([])).toBeFalsy()
    expect(isEntry(null)).toBeFalsy()
    expect(isEntry(false)).toBeFalsy()
  })

  it('should accept zero as ID', async () => {
    expect(isEntry({
      id: 0,
      __typename: 'foo'
    })).toBeTruthy()
  })

  it('should not detect ID only', async () => {
    expect(isEntry({
      id: 'foo',
      bar: 'bar'
    })).toBeFalsy()
  })

  it('should not detect type only', async () => {
    expect(isEntry({
      __typename: 'foo',
      bar: 'bar'
    })).toBeFalsy()
  })

  it('should detect ID and typename with no other values', async () => {
    expect(isEntry({
      id: 'foo',
      __typename: 'bar'
    })).toBeTruthy()
  })

  it('should detect ID and typename with no other values', async () => {
    expect(isEntry({
      id: 'foo',
      __typename: 'bar',
      bar: 'bar'
    })).toBeTruthy()
  })
})
