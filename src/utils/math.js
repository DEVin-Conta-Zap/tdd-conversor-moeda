export function multiply(num1, num2) {
  if(isNaN(num1) || isNaN(num2)) {
    throw new Error('Arguments must be numbers')
  }

  return num1 * num2;
}