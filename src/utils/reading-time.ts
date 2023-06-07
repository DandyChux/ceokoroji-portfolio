export default function readingTime(text: string) {
  const wordsPerMinute = 200 // Average number of words per minute for adults
  const numberOfWords = text.split(/\s/g).length
  const minutes = numberOfWords / wordsPerMinute
  const readTime = Math.ceil(minutes)
  return `${readTime} min read`
}