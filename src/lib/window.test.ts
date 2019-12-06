import { width, height } from './window'

describe('window', () => {
  it('returns', () => {
    expect(width).toBeGreaterThan(0)
    expect(height).toBeGreaterThan(0)
  })
})
