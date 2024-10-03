// Function to count words in plain text
export const getWordCount = (text: string) => {
  return text
    .trim()
    .split(/\s+/)
    .filter(word => word !== '')
    .length
}