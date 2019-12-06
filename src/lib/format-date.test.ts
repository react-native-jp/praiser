import formatDate from './format-date'

describe('formatDate', () => {
  it('returns formatted date', () => {
    const xmas2019 = new Date(2019, 11, 25)
    const actual = formatDate(xmas2019)
    expect(actual).toBe('2019/12/25')
  })
})
