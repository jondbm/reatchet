export const getInitial = name => {
  return name ? name.slice(0, 1).toUpperCase() : '?'
}

export const convertToCamelCase = string => {
  const words = string.split(' ')
  const formattedWords = words.map((word, index) => {
    if (index === 0) {
      return word.toLowerCase()
    }
    return word[0].toUpperCase() + word.slice(1).toLowerCase()
  })
  return formattedWords.join('')
}
