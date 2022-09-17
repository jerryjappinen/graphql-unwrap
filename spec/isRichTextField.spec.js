import { describe, it, expect } from 'vitest'

import isRichTextField from '../src/isRichTextField'

describe('isRichTextField', () => {
  it('should not detect empty values', async () => {
    expect(isRichTextField({})).toBeFalsy()
    expect(isRichTextField([])).toBeFalsy()
    expect(isRichTextField(null)).toBeFalsy()
    expect(isRichTextField(false)).toBeFalsy()
    expect(isRichTextField({
      id: 'foo'
    })).toBeFalsy()
  })

  it('should detect object field', async () => {
    expect(isRichTextField({
      references: []
    })).toBeTruthy()
    expect(isRichTextField({
      references: [
        {
          __typename: 'Foo',
          id: 'bar'
        }
      ]
    })).toBeTruthy()
  })

  it('should accept options', async () => {
    expect(isRichTextField({
      customPath: [
        {
          __typename: 'Foo',
          id: 'bar'
        }
      ]
    }, {
      richTextReferencesPath: 'customPath'
    })).toBeTruthy()
  })
})
