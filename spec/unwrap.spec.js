import { describe, it, expect } from 'vitest'

import isArray from 'lodash-es/isArray'
import isPlainObject from 'lodash-es/isPlainObject'

import unwrap from '../src'

describe('unwrap', () => {
  it('should retain endpoints', async () => {
    const [entries, idsByEndpoint] = unwrap({
      foo: [
        {
          __typename: 'post',
          id: 'a1'
        },
        {
          __typename: 'post',
          id: 'a1'
        }
      ],
      bar: {
        __typename: 'post',
        id: 'b1'
      }
    })

    expect(isArray(idsByEndpoint.foo)).toBeTruthy()
    expect(isArray(idsByEndpoint.bar)).toBeTruthy()
    expect(isPlainObject(entries)).toBeTruthy()
  })

  it('should respect paths', async () => {
    const unwrapOptions = {
      queryPath: 'returning',
      itemsPath: 'items'
    }

    const [entries, { foo }] = unwrap({
      foo: {
        returning: [
          {
            __typename: 'post',
            id: 'a1',
            asset: {
              __typename: 'asset',
              id: 'b1'
            },
            authors: {
              items: [
                {
                  __typename: 'post',
                  id: 'c1'
                }
              ]
            }
          },
          {
            __typename: 'post',
            id: 'a2',
            asset: {
              __typename: 'asset',
              id: 'b2'
            },
            authors: {
              items: [
                {
                  __typename: 'post',
                  id: 'c2'
                }
              ]
            }
          }
        ]
      }
    }, unwrapOptions)

    expect(isArray(foo)).toBeTruthy()
    expect(isPlainObject(entries)).toBeTruthy()
  })
})
