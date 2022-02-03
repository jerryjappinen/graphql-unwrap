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
})
