export const idCheck = (id: string) => {
  if (typeof id !== 'string') {
    throw new Error('The type of the parameter should be a string!');
  }
}
