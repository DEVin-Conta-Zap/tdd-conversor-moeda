import { multiply } from './math'

describe('multiply: returns the multiplication', () => {
  const cases = [
    ['of two numbers', 1000, 5.16, 5160],
    ['of other numbers', 2, 6.24, 12.48],
    ['of a number and a string', 15, '7.29', 109.35],
    ['of a string and a number', '3', 5, 15],
    ['of a two strings', '5', '5', 25]
  ]

  test.each(cases)('%s', (_, a, b, expected) => {
    expect(multiply(a,b)).toBe(expected)
  })
})

describe('multiply: throws an erro when,', () => {
  const cases = [
    [
      'arguments are texts',
      'some invalid value',
      'another must be numbers',
      'Arguments must be numbers'
    ]
  ]

  test.each(cases)('%s', (_, a, b, expected) => {
    expect(() => multiply(a, b)).toThrowError(expected)
  })
})