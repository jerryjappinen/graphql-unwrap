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

    expect(entries).toBeObject()
    expect(idsByEndpoint.foo).toBeArray()
    expect(idsByEndpoint.bar).toBeArray()
  })

  it('should respect paths', async () => {
    const unwrapOptions = {
      itemsPath: 'items'
    }

    const [entries, { foo }] = unwrap({
      foo: {
        items: [
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

    expect(entries).toBeObject()
    expect(foo).toBeArray()
  })
})
