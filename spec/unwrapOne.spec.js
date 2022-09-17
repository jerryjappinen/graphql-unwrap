import { describe, it, expect } from 'vitest'

import includes from 'lodash-es/includes'
import isArray from 'lodash-es/isArray'
import isPlainObject from 'lodash-es/isPlainObject'
import keys from 'lodash-es/keys'

import unwrapOne from '../src/unwrapOne'

describe('unwrapOne', () => {
  it('should return correct types', async () => {
    const [entries, ids] = unwrapOne({
      __typename: 'Parent',
      id: 'a1',

      firstBorn: {
        __typename: 'Child',
        id: 'b1'
      },

      children: [
        {
          __typename: 'Child',
          id: 'b1'
        },
        {
          __typename: 'Child',
          id: 'b2'
        },
        {
          __typename: 'Child',
          id: 'b3'
        }
      ]

    })

    expect(isArray(ids)).toBeTruthy()
    expect(isPlainObject(entries)).toBeTruthy()

    // `ids` will contain the top-level ID
    expect(ids.length).toEqual(1)
    expect(ids[0]).toEqual('a1')

    // `entries` should contain everything
    const mustHaveEntries = ['a1', 'b1', 'b2', 'b3']
    mustHaveEntries.forEach((id) => {
      expect(includes(keys(entries), id)).toBeTruthy()
    })
  })

  it('should return entries from rich text references', async () => {
    const [entries, ids] = unwrapOne({
      __typename: 'Parent',
      id: 'a1',

      someRichTextField: {
        references: [
          {
            __typename: 'Child',
            id: 'b1'
          }
        ]
      }
    })

    expect(isArray(ids)).toBeTruthy()
    expect(isPlainObject(entries)).toBeTruthy()
  })

  it('should accept id option', async () => {
    const [entries, ids] = unwrapOne({
      type: 'Parent',
      uuid: 'a-1',

      firstBorn: {
        type: 'Child',
        uuid: 'b-1'
      },

      children: [
        {
          type: 'Child',
          uuid: 'b-1'
        },
        {
          type: 'Child',
          uuid: 'b-2'
        },
        {
          type: 'Child',
          uuid: 'b-3'
        }
      ]

    }, {
      idKey: 'uuid',
      typeKey: 'type'
    })

    expect(ids.indexOf('a-1') > -1).toBeTruthy()
    expect(entries['a-1'].type).toBeTypeOf('string')
  })

  it('should accept type option', async () => {
    const [entries, ids] = unwrapOne({
      type: 'Parent',
      id: 'a-1',

      firstBorn: {
        type: 'Child',
        id: 'b-1'
      },

      children: [
        {
          type: 'Child',
          id: 'b-1'
        },
        {
          type: 'Child',
          id: 'b-2'
        },
        {
          type: 'Child',
          id: 'b-3'
        }
      ]

    }, {
      typeKey: 'type'
    })

    expect(entries[ids[0]].type).toBeTypeOf('string')
  })
})
