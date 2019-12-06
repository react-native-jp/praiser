import { assert, assertIsDefined } from './assert'

describe('assert', () => {
  it('throws when be passed falsy values', () => {
    expect(() => {
      assert(false)
    }).toThrow()
  })
})

describe('assertIsDefined', () => {
  it('throws when be passed null', () => {
    expect(() => {
      assertIsDefined(null)
    }).toThrow()
  })

  it('throws when be passed undefined', () => {
    expect(() => {
      assertIsDefined(undefined)
    }).toThrow()
  })
})
