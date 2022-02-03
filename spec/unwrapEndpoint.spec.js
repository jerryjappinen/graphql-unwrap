import unwrapEndpoint from '../src/unwrapEndpoint'

describe('unwrapEndpoint', () => {
  it('should return correct types', async () => {
    const [entries, ids] = unwrapEndpoint({
      __typename: 'Parent',
      id: 'a-1',

      firstBorn: {
        __typename: 'Child',
        id: 'b-1'
      },

      children: [
        {
          __typename: 'Child',
          id: 'b-1'
        },
        {
          __typename: 'Child',
          id: 'b-2'
        },
        {
          __typename: 'Child',
          id: 'b-3'
        }
      ]

    })

    expect(entries).toBeObject()
    expect(ids).toBeArray()
  })
})
