export const handleRequest = async <T>(promise?: Promise<T>) => {
  if (!promise) return [undefined, 'Failed']
  return promise
    .then((response) => {
      return [response, undefined]
    })
    .catch((error: Error) => {
      return [undefined, error]
    })
}
