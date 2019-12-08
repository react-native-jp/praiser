import round from './round'

describe('round', () => {
  it('returns rounded values to 1 decimal places', () => {
    expect(round(0.5)).toBe(1)
    expect(round(0.4)).toBe(0)
  })

  it('returns rounded values to specified decimal places', () => {
    expect(round(0.55, 2)).toBe(0.6)
    expect(round(0.54, 2)).toBe(0.5)
    expect(round(0.555, 3)).toBe(0.56)
    expect(round(0.554, 3)).toBe(0.55)
  })
})
