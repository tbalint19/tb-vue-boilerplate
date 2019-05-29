export const getError = (text, validations) => {
  for (let validation of validations) {
    if (!RegExp(validation.regex).test(text))
      return validation.errorKey
  }
  return null
}
