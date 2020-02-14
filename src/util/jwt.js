const b64DecodeUnicode = (str) => {
  return decodeURIComponent(
    atob(str)
      .split('')
      .map((char) => {
        return '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )
}

export const parse = (token) => {
  try {
    const decoded = b64DecodeUnicode(token.split('.')[1])
    return JSON.parse(decoded)
  } catch (e) {
    return null
  }
}
